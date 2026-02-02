<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$servername = "servidor-mysql-1";
$username   = "root";
$password   = "secret";
$dbname     = "mydatabase";

// CONNECT
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// CHECK POST
if (!isset($_POST["data"])) {
    echo json_encode(["error" => "No data received"]);
    exit;
}

$data = json_decode($_POST["data"], true);
if (!$data) {
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

// CHECK IF USER EXISTS IF NOT CREATE ONE
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $data["email"]);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "error", "msg" => "Email already registered"]);
    exit;
   } else {
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, cuentaBancaria, email, telefono, contrasena) VALUES (?, ?, ?, ?, ?)");
    
    $stmt->bind_param(
        "sssss",
        $data["nombre"],
        $data["cuentaBancaria"],
        $data["email"],
        $data["telefono"],
        $data["contrasena"]
        );
   }

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "msg" => "Usuario registrado"]);
} else {
    echo json_encode(["status" => "error", "msg" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
