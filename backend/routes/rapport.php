<?php
require_once __DIR__ . "/../config/db.php";
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$request = trim($_SERVER['REQUEST_URI'], "/");

// 🔹 Debugging (optional)
error_log("REQUEST_URI: " . $_SERVER['REQUEST_URI']);
error_log("PARSED REQUEST: " . $request);

if ($request === 'api/rapport' && $method === 'GET') {
    error_log("Alle Rapporte abrufen...");
    $stmt = $pdo->query("SELECT * FROM rapport");
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$result) {
        echo json_encode([]);  
        exit;
    }

    echo json_encode($result);
    exit;
}

// 🔹 Falsche Route hier:
if (preg_match('#^api/rapport/(\d+)$#', $request, $matches) && $method === 'GET') {
    $auftrag_id = $matches[1];
    error_log("Rapporte für Auftrag: " . $auftrag_id);
    $stmt = $pdo->prepare("SELECT * FROM rapport WHERE auftrag_id = ?");
    $stmt->execute([$auftrag_id]);
    $rapporte = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rapporte);
    exit;
}


// 🔹 Rapport erstellen
if ($request === 'api/rapport' && $method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['auftrag_id'], $data['arbeiter_id'], $data['dokument'])) {
        echo json_encode(["error" => "Ungültige Eingabe"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO rapport (auftrag_id, arbeiter_id, dokument, datum, verrechnet) VALUES (?, ?, ?, NOW(), 0)");
    $stmt->execute([$data['auftrag_id'], $data['arbeiter_id'], $data['dokument']]);
    echo json_encode(["message" => "Rapport gespeichert"]);
    exit;
}

// 🔹 Rapport als verrechnet markieren
if (preg_match('#^api/rapport/verrechnet/(\d+)$#', $request, $matches) && $method === 'PATCH') {
    $rapport_id = $matches[1];
    $stmt = $pdo->prepare("UPDATE rapport SET verrechnet = 1 WHERE id = ?");
    $stmt->execute([$rapport_id]);
    echo json_encode(["message" => "Rapport verrechnet"]);
    exit;
}

// 🔹 Rapport löschen
if (preg_match('#^api/rapport/(\d+)$#', $request, $matches) && $method === 'DELETE') {
    $rapport_id = $matches[1];
    $stmt = $pdo->prepare("DELETE FROM rapport WHERE id = ?");
    $stmt->execute([$rapport_id]);
    echo json_encode(["message" => "Rapport gelöscht"]);
    exit;
}

if (preg_match('#^api/rapport/(\d+)$#', $request, $matches) && $method === 'GET') {
    $auftrag_id = $matches[1];
    $stmt = $pdo->prepare("SELECT * FROM rapport WHERE auftrag_id = ?");
    $stmt->execute([$auftrag_id]);
    $rapporte = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rapporte);
    exit;
}

// 🔹 Fehler, falls Endpoint nicht existiert
http_response_code(404);
echo json_encode(["error" => "Endpoint nicht gefunden"]);
?>
