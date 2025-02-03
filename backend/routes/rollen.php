<?php
require_once __DIR__ . "/../config/db.php";

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM rollen");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['bezeichnung'])) {
        echo json_encode(["error" => "Fehlende Eingabe"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO rollen (bezeichnung) VALUES (?)");
    $stmt->execute([$data['bezeichnung']]);
    echo json_encode(["message" => "Rolle erstellt"]);
    exit;
}

if ($method === 'DELETE' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("DELETE FROM rollen WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    echo json_encode(["message" => "Rolle gelöscht"]);
    exit;
}

http_response_code(404);
echo json_encode(["error" => "Endpoint nicht gefunden"]);
?>
