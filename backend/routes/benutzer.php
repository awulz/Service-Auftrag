<?php
require_once __DIR__ . "/../config/db.php";

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT id, arbeiter_id, vorname, nachname, rolle_id FROM benutzer");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['arbeiter_id'], $data['vorname'], $data['nachname'], $data['passwort'], $data['rolle_id'])) {
        echo json_encode(["error" => "Fehlende Eingabe"]);
        exit;
    }

    $hash = password_hash($data['passwort'], PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO benutzer (arbeiter_id, vorname, nachname, passwort, rolle_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$data['arbeiter_id'], $data['vorname'], $data['nachname'], $hash, $data['rolle_id']]);
    echo json_encode(["message" => "Benutzer erstellt"]);
    exit;
}

if ($method === 'PATCH' && isset($_GET['id'])) {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        echo json_encode(["error" => "Fehlende Eingabe"]);
        exit;
    }

    $sql = "UPDATE benutzer SET ";
    $params = [];
    foreach ($data as $key => $value) {
        if ($key === "passwort") {
            $value = password_hash($value, PASSWORD_DEFAULT);
        }
        $sql .= "$key = ?, ";
        $params[] = $value;
    }
    $sql = rtrim($sql, ", ") . " WHERE id = ?";
    $params[] = $_GET['id'];

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode(["message" => "Benutzer aktualisiert"]);
    exit;
}

if ($method === 'DELETE' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("DELETE FROM benutzer WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    echo json_encode(["message" => "Benutzer gelöscht"]);
    exit;
}

http_response_code(404);
echo json_encode(["error" => "Endpoint nicht gefunden"]);
?>
