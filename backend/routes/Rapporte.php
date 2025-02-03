<?php
require_once __DIR__ . "/../config/db.php";


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// OPTIONS-Request für CORS beantworten
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$request = trim($_SERVER['REQUEST_URI'], "/");
$method = $_SERVER['REQUEST_METHOD'];

// 🔹 Alle Rapporte zu einem Auftrag abrufen (GET /api/rapport/{auftrag_id})
if (preg_match('#^api/rapport/verrechnet/(\d+)$#', $request, $matches) && $method === 'PATCH') {
    $auftrag_id = $matches[1];
    $stmt = $pdo->prepare("SELECT * FROM rapport WHERE auftrag_id = ?");
    $stmt->execute([$auftrag_id]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

// 🔹 Neuen Rapport hochladen (POST /api/rapport)
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

// 🔹 Rapport löschen (DELETE /api/rapport/{rapport_id})
if (preg_match('#^api/rapport/verrechnet/(\d+)$#', $request, $matches) && $method === 'PATCH') {
    $rapport_id = $matches[1];
    $stmt = $pdo->prepare("DELETE FROM rapport WHERE id = ?");
    $stmt->execute([$rapport_id]);
    echo json_encode(["message" => "Rapport gelöscht"]);
    exit;
}

// 🔹 Rapport als verrechnet markieren (PATCH /api/rapport/verrechnet/{rapport_id})
if (preg_match('#^api/rapport/verrechnet/(\d+)$#', $request, $matches) && $method === 'PATCH') {
    $rapport_id = $matches[1];
    $stmt = $pdo->prepare("UPDATE rapport SET verrechnet = 1 WHERE id = ?");
    $stmt->execute([$rapport_id]);
    echo json_encode(["message" => "Rapport verrechnet"]);
    exit;
}


http_response_code(404);
echo json_encode(["error" => "Endpoint nicht gefunden"]);
?>
