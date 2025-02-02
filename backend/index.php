<?php
require 'config/db.php'; // Verbindung zur Datenbank
require 'routes/auftraege.php';

header('Content-Type: application/json');

// Bereinige die URL: Entferne den Projektpfad und hole `request`
$request = $_GET['request'] ?? trim(str_replace("/Service-Auftrag-1/backend/index.php", "", $_SERVER['REQUEST_URI']), "/");
$method  = $_SERVER['REQUEST_METHOD'];

// 🔹 Debugging: Zeigt den bereinigten `request`-Wert
if (isset($_GET['debug'])) {
    echo json_encode(["request" => $request]);
    exit;
}

// 🔹 API: Alle Aufträge abrufen (GET /api/auftraege)
if ($request === 'api/auftraege' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM auftraege");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

// 🔹 API: Neuen Auftrag erstellen (POST /api/auftrag)
if ($request === 'api/auftrag' && $method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['kategorie'], $data['status'], $data['deadline'])) {
        echo json_encode(["error" => "Ungültige Eingabe"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO auftraege (kategorie, status, deadline) VALUES (?, ?, ?)");
    $stmt->execute([$data['kategorie'], $data['status'], $data['deadline']]);
    echo json_encode(["message" => "Auftrag erstellt!"]);
    exit;
}

// 🔹 API: Auftrag löschen (DELETE /api/auftrag/{id})
if (preg_match('/api\/auftrag\/(\d+)/', $request, $matches) && $method === 'DELETE') {
    $id = $matches[1];
    $stmt = $pdo->prepare("DELETE FROM auftraege WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["message" => "Auftrag gelöscht!"]);
    exit;
}

// 🔹 API: Auftrag aktualisieren (PUT /api/auftrag/{id})
if (preg_match('/api\/auftrag\/(\d+)/', $request, $matches) && $method === 'PUT') {
    $id = $matches[1];
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['kategorie'], $data['status'], $data['deadline'])) {
        echo json_encode(["error" => "Ungültige Eingabe"]);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE auftraege SET kategorie=?, status=?, deadline=? WHERE id=?");
    $stmt->execute([$data['kategorie'], $data['status'], $data['deadline'], $id]);
    echo json_encode(["message" => "Auftrag aktualisiert!"]);
    exit;
}

// 🔹 API: Auftrag als abgeschlossen markieren (PATCH /api/auftrag/done/{id})
if (preg_match('/api\/auftrag\/done\/(\d+)/', $request, $matches) && $method === 'PATCH') {
    $id = $matches[1];
    $stmt = $pdo->prepare("UPDATE auftraege SET status='Erledigt' WHERE id=?");
    $stmt->execute([$id]);
    echo json_encode(["message" => "Auftrag erledigt!"]);
    exit;
}

// 🔹 Fehler, falls Endpoint nicht existiert
http_response_code(404);
echo json_encode(["error" => "Endpoint nicht gefunden", "request" => $request]);
?>
