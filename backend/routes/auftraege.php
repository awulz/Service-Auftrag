<?php
require_once __DIR__ . "/../config/db.php";
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$request = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), "/");

// 🔹 Alle Aufträge abrufen
if ($request === 'api/auftraege' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM auftraege");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

// 🔹 Einzelnen Auftrag abrufen
if (preg_match('#^api/auftrag/(\d+)$#', $request, $matches) && $method === 'GET') {
    $id = $matches[1];
    $stmt = $pdo->prepare("SELECT * FROM auftraege WHERE id = ?");
    $stmt->execute([$id]);
    $auftrag = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($auftrag) {
        echo json_encode($auftrag);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Auftrag nicht gefunden"]);
    }
    exit;
}

// 🔹 Auftrag erstellen
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

// 🔹 Auftrag aktualisieren
if (preg_match('#^api/auftrag/(\d+)$#', $request, $matches) && $method === 'PUT') {
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

// 🔹 Auftrag als verrechnet markieren
if (preg_match('#^api/auftrag/verrechnet/(\d+)$#', $request, $matches) && $method === 'PATCH') {
    $id = $matches[1];
    $stmt = $pdo->prepare("UPDATE auftraege SET status='verrechnet' WHERE id=?");
    $stmt->execute([$id]);
    echo json_encode(["message" => "Auftrag verrechnet!"]);
    exit;
}

// 🔹 Auftrag löschen
if (preg_match('#^api/auftrag/(\d+)$#', $request, $matches) && $method === 'DELETE') {
    $id = $matches[1];
    $stmt = $pdo->prepare("DELETE FROM auftraege WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["message" => "Auftrag gelöscht"]);
    exit;
}

// 🔹 Fehler, falls Endpoint nicht existiert
http_response_code(404);
echo json_encode(["error" => "Endpoint nicht gefunden"]);
?>
