<?php
require_once __DIR__ . "/../config/db.php";

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM auftrag_status");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($method === 'PATCH' && isset($_GET['auftrag_id'])) {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['status_id'])) {
        echo json_encode(["error" => "Fehlende Eingabe"]);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE auftraege SET status_id = ? WHERE id = ?");
    $stmt->execute([$data['status_id'], $_GET['auftrag_id']]);
    echo json_encode(["message" => "Status aktualisiert"]);
    exit;
}

http_response_code(404);
echo json_encode(["error" => "Endpoint nicht gefunden"]);
?>
