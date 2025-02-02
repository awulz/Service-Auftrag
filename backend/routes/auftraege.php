<?php
require '../config/db.php';

header('Content-Type: application/json');
$request = trim($_SERVER['REQUEST_URI'], "/");
$method  = $_SERVER['REQUEST_METHOD'];

if ($request === 'api/auftraege' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM auftraege");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($request === 'api/auftrag' && $method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || !isset($data['kategorie'], $data['status'], $data['deadline'])) {
        echo json_encode(["error" => "Ungültige Eingabe"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO auftraege (kategorie, status, deadline) VALUES (?, ?, ?)");
    $stmt->execute([$data['kategorie'], $data['status'], $data['deadline']]);
    echo json_encode(["message" => "Auftrag erstellt!"]);
    exit;
}
?>
