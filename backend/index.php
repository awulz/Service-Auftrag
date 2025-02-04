<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/config/db.php";

$request = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), "/");

switch ($request) {
    case 'api/login':
        require_once __DIR__ . "/routes/auth.php";
        break;
    case 'api/benutzer':
        require_once __DIR__ . "/routes/benutzer.php";
        break;
    case 'api/auftraege':
        require_once __DIR__ . "/routes/auftraege.php";
        break;
    case 'api/auftrag_status':
        require_once __DIR__ . "/routes/auftrag_status.php";
        break;
    case 'api/auftrag_mitarbeiter':
        require_once __DIR__ . "/routes/auftrag_mitarbeiter.php";
        break;
    case 'api/dokumente':
        require_once __DIR__ . "/routes/dokumente.php";
        break;
    case 'api/auftrag':
        require_once __DIR__ . "/routes/auftraege.php";
        break;
    case 'api/rapport':
    case (preg_match("#^api/rapport(/.*)?$#", $request) ? true : false):
    case 'api/rapporte':  // ➕ Neu hinzugefügt, um alle Rapporte zu unterstützen
        require_once __DIR__ . "/routes/rapport.php";
        break;
    case 'api/auftrag-erfassen':
        require_once __DIR__ . "/routes/auftrag.php"; 
        break;
            
        
    default:
        http_response_code(404);
        echo json_encode(["error" => "Endpoint nicht gefunden"]);
        break;
}
?>
