<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/config/db.php";

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// 🔹 Bereinigung der Route
$request = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), "/");
$request = str_replace("Service-Auftrag-2/backend/", "", $request); // Falls nötig

// Debugging (Falls du testen willst, welche Route aufgerufen wird)
if (isset($_GET['debug'])) {
    echo json_encode(["debug_request" => $request]);
    exit;
}

// API-Routing für Login, Aufträge und Rapporte
switch ($request) {
    case 'api/login':
        require_once __DIR__ . "/routes/auth.php";
        break;
    case 'api/auftraege':
    case 'api/auftrag':
        require_once __DIR__ . "/routes/auftraege.php";
        break;
    case 'api/rapport':
        require_once __DIR__ . "/routes/rapporte.php";
        break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "Endpoint nicht gefunden", "request" => $request]);
        break;
}
?>
