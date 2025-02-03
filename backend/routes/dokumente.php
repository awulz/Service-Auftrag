<?php
require_once __DIR__ . "/../config/db.php";

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    if (!isset($_FILES['datei']) || !isset($_POST['auftrag_id']) || !isset($_POST['hochgeladen_von'])) {
        echo json_encode(["error" => "Fehlende Datei oder Auftrags-ID"]);
        exit;
    }

    $dateiname = basename($_FILES['datei']['name']);
    $zielpfad = __DIR__ . "/../uploads/" . $dateiname;

    if (move_uploaded_file($_FILES['datei']['tmp_name'], $zielpfad)) {
        $stmt = $pdo->prepare("INSERT INTO dokumente (auftrag_id, dateiname, dateipfad, hochgeladen_von) VALUES (?, ?, ?, ?)");
        $stmt->execute([$_POST['auftrag_id'], $dateiname, $zielpfad, $_POST['hochgeladen_von']]);
        echo json_encode(["message" => "Datei hochgeladen"]);
    } else {
        echo json_encode(["error" => "Upload fehlgeschlagen"]);
    }
    exit;
}

if ($method === 'GET' && isset($_GET['auftrag_id'])) {
    $stmt = $pdo->prepare("SELECT * FROM dokumente WHERE auftrag_id = ?");
    $stmt->execute([$_GET['auftrag_id']]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

http_response_code(404);
echo json_encode(["error" => "Endpoint nicht gefunden"]);
?>
