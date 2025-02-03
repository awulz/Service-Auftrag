<?php
require_once __DIR__ . "/../config/db.php";

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET' && isset($_GET['auftrag_id'])) {
    $stmt = $pdo->prepare("SELECT * FROM auftrag_mitarbeiter WHERE auftrag_id = ?");
    $stmt->execute([$_GET['auftrag_id']]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['auftrag_id'], $data['arbeiter_id'])) {
        echo json_encode(["error" => "Fehlende Eingabe"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO auftrag_mitarbeiter (auftrag_id, arbeiter_id) VALUES (?, ?)");
    $stmt->execute([$data['auftrag_id'], $data['arbeiter_id']]);
    echo json_encode(["message" => "Mitarbeiter zugewiesen"]);
    exit;
}

if ($method === 'DELETE' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("DELETE FROM auftrag_mitarbeiter WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    echo json_encode(["message" => "Zuweisung entfernt"]);
    exit;
}

http_response_code(404);
echo json_encode(["error" => "Endpoint nicht gefunden"]);
?>
