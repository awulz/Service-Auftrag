<?php
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method  = $_SERVER['REQUEST_METHOD'];

if ($request === '/api/hello' && $method === 'GET') {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Hello, World!']);
    exit;
}

if ($request === '/login' && $method === 'POST') {
    header('Content-Type: application/json');
    //Logik muss noch implementiert werden.
    echo json_encode(['message' => 'Login endpoint - not implemented yet']);
    exit;
}

if ($request === '/register' && $method === 'POST') {
    header('Content-Type: application/json');
    //^^
    echo json_encode(['message' => 'Registration endpoint - not implemented yet']);
    exit;
}

if ($request === '/logout' && $method === 'POST') {
    header('Content-Type: application/json');
    //^^
    echo json_encode(['message' => 'Registration endpoint - not implemented yet']);
    exit;
}

if ($request === '/getDataWhatever' && $method === 'POST') {
    header('Content-Type: application/json');
    //^^
    echo json_encode(['message' => 'Registration endpoint - not implemented yet']);
    exit;
}

if ($request === '/writeDataWhatever' && $method === 'POST') {
    header('Content-Type: application/json');
    //^^
    echo json_encode(['message' => 'Registration endpoint - not implemented yet']);
    exit;
}

if ($request === '/updateDataWhatever' && $method === 'POST') {
    header('Content-Type: application/json');
    //^^
    echo json_encode(['message' => 'Registration endpoint - not implemented yet']);
    exit;
}

//wenn noch gebraucht, dann User-management also CRUD für User (relevant für admin)

http_response_code(404);
echo json_encode(['error' => 'Endpoint not found']);