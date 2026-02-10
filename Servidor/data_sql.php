<?php

header('Access-Control-Allow-Origin: *');

$servername = "servidor-mysql-1";
$username   = "root";
$password   = "secret";
$dbname     = "mydatabase";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, name, imagen, precio, disponibles, descripcion FROM Productos";
$result = $conn->query($sql);


if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $myObj = new stdClass;
        $myObj->id          = $row["id"];
        $myObj->name        = $row["name"];
        $myObj->imagen      = $row["imagen"];
        $myObj->precio      = $row["precio"];
        $myObj->disponibles = $row["disponibles"];
        $myObj->descripcion = $row["descripcion"];

        $productos[] = $myObj;
    }

    echo json_encode($productos);
} else {
    echo "0 results";
}

$conn->close();
?>
