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

switch (true) {  // <-- Änderung: `switch (true)` für Regex
    case $request === 'api/login':
        require_once __DIR__ . "/routes/auth.php";
        break;
    
    case $request === 'api/benutzer':
        require_once __DIR__ . "/routes/benutzer.php";
        break;

    case $request === 'api/auftraege':
        require_once __DIR__ . "/routes/auftraege.php";
        break;
    
    case preg_match("#^api/auftrag/(\d+)$#", $request):  // 🔹 Einzelauftrag abrufen
        require_once __DIR__ . "/routes/auftraege.php";
        break;

    case $request === 'api/auftrag':  // 🔹 Auftrag erstellen
        require_once __DIR__ . "/routes/auftraege.php";
        break;

    case $request === 'api/auftrag_status':
        require_once __DIR__ . "/routes/auftrag_status.php";
        break;

    case $request === 'api/auftrag_mitarbeiter':
        require_once __DIR__ . "/routes/auftrag_mitarbeiter.php";
        break;

    case $request === 'api/dokumente':
        require_once __DIR__ . "/routes/dokumente.php";
        break;

    case $request === 'api/rapport':
    case $request === 'api/rapporte':  // ✅ Alle Rapporte abrufen
    case preg_match("#^api/rapport/(\d+)$#", $request):  // ✅ Einzelne Rapporte abrufen
        require_once __DIR__ . "/routes/rapport.php";
        break;

    case $request === 'api/auftrag-erfassen':
        require_once __DIR__ . "/routes/auftrag.php"; 
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Endpoint nicht gefunden"]);
        break;
}
?>
