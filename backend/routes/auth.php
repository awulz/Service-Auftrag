<?php
require_once __DIR__ . "/../config/db.php";
global $request; // Damit die Variable aus index.php erkannt wird


// CORS-Header setzen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// OPTIONS-Request für CORS beantworten
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 🔹 API: Benutzer-Login (POST /api/login)
if ($request === 'api/login' && $method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['arbeiter_id'], $data['passwort'])) {
        echo json_encode(["error" => "Ungültige Eingabe"]);
        exit;
    }

    // Benutzer aus DB abrufen
    $stmt = $pdo->prepare("SELECT * FROM benutzer WHERE arbeiter_id = ?");
    $stmt->execute([$data['arbeiter_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["error" => "Benutzer nicht gefunden"]);
        exit;
    }

    if (!password_verify($data['passwort'], $user['passwort'])) {
        echo json_encode(["error" => "Falsches Passwort"]);
        exit;
    }

    echo json_encode(["message" => "Login erfolgreich", "user" => [
        "id" => $user['id'],
        "arbeiter_id" => $user['arbeiter_id'],
        "rolle" => $user['rolle']
    ]]);
    exit;
}
?>
