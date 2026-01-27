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

// UPDATE ID = 0
$stmt = $conn->prepare("
    UPDATE usuarios SET
        nombre       = ?,
        apellido     = ?,
        dni          = ?,
        fecha        = ?,
        codigo       = ?,
        correo       = ?,
        telefonofijo = ?,
        telefono     = ?,
        tarjeta      = ?,
        iban         = ?,
        contrasena   = ?
    WHERE id = 0
");

$stmt->bind_param(
    "sssssssssss",
    $data["nombre"],
    $data["apellido"],
    $data["dni"],
    $data["fecha"],
    $data["codigo"],
    $data["correo"],
    $data["telefonofijo"],
    $data["telefono"],
    $data["tarjeta"],
    $data["iban"],
    $data["contrasena"]
);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "msg" => "ID 0 updated"]);
} else {
    echo json_encode(["status" => "error", "msg" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
