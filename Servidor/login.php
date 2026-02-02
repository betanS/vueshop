<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$servername = "servidor-mysql-1";
$username   = "root";
$password   = "secret";
$dbname     = "mydatabase";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "msg" => "DB connection failed"]);
    exit;
}

if (!isset($_POST["data"])) {
    echo json_encode(["status" => "error", "msg" => "No data received"]);
    exit;
}

$data = json_decode($_POST["data"], true);
if (!$data) {
    echo json_encode(["status" => "error", "msg" => "Invalid JSON"]);
    exit;
}

$email = $data["email"] ?? "";
$pass  = $data["contrasena"] ?? "";

$stmt = $conn->prepare("SELECT id, contrasena FROM usuarios WHERE email = ?");
if (!$stmt) {
    echo json_encode(["status" => "error", "msg" => $conn->error]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["status" => "error", "msg" => "Email not found"]);
    exit;
}

$stmt->bind_result($id, $hash);
$stmt->fetch();

if ($pass !== $hash) {
    echo json_encode(["status" => "error", "msg" => "Incorrect password"]);
    exit;
}

echo json_encode([
    "status" => "success",
    "msg" => "Login OK",
    "user_id" => $id
]);

$stmt->close();
$conn->close();
