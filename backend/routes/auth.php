<?php
require __DIR__ . "/../config/db.php";


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// CORS-Header setzen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// OPTIONS-Request für CORS beantworten
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 🔹 API: Benutzer-Registrierung (POST /api/register)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['request'] === 'api/register') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['arbeiter_id'], $data['vorname'], $data['nachname'], $data['passwort'], $data['rolle'])) {
        echo json_encode(["error" => "Ungültige Eingabe"]);
        exit;
    }

    // Passwort hashen
    $hashed_password = password_hash($data['passwort'], PASSWORD_BCRYPT);

    // Benutzer speichern
    $stmt = $pdo->prepare("INSERT INTO benutzer (arbeiter_id, vorname, nachname, passwort, rolle) VALUES (?, ?, ?, ?, ?)");
    try {
        $stmt->execute([$data['arbeiter_id'], $data['vorname'], $data['nachname'], $hashed_password, $data['rolle']]);
        echo json_encode(["message" => "Benutzer registriert!"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Benutzer existiert bereits"]);
    }
    exit;
}

// 🔹 API: Benutzer-Login (POST /api/login)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['request'] === 'api/login') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['arbeiter_id'], $data['passwort'])) {
        echo json_encode(["error" => "Ungültige Eingabe"]);
        exit;
    }

    // Benutzer aus der DB abrufen
    $stmt = $pdo->prepare("SELECT * FROM benutzer WHERE arbeiter_id = ?");
    $stmt->execute([$data['arbeiter_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data['passwort'], $user['passwort'])) {
        // JWT-Token erstellen
        $key = "geheimes_jwt_schluessel"; 
        $payload = [
            "id" => $user['id'],
            "arbeiter_id" => $user['arbeiter_id'],
            "rolle" => $user['rolle'],
            "exp" => time() + 3600 // Token läuft nach 1 Stunde ab
        ];
        $jwt = JWT::encode($payload, $key, 'HS256');

        echo json_encode(["token" => $jwt, "message" => "Login erfolgreich"]);
    } else {
        echo json_encode(["error" => "Falsche Anmeldedaten"]);
    }
    exit;
}
?>
