<?php
// index.php
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method  = $_SERVER['REQUEST_METHOD'];

if ($request === '/api/hello' && $method === 'GET') {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Hello, World!']);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Endpoint not found']);