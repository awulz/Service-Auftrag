<?php
$host = "localhost";
$dbname = "auftragdb";
$username = "root"; // Dein MySQL Benutzername
$password = ""; // Dein MySQL Passwort (falls XAMPP, leer lassen)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Datenbankverbindung fehlgeschlagen: " . $e->getMessage()]));
}
?>
