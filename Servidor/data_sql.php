<?php

header('Access-Control-Allow-Origin: *');

$servername = "servidor-mysql-1";
$username   = "root";
$password   = "secret";
$dbname     = "mydatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name, imagen, precio, disponibles, descripcion FROM Productos WHERE id = 1";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $myObj = new stdClass;
        $myObj->name       = $row["name"];
        $myObj->imagen     = $row["imagen"];
        $myObj->precio          = $row["precio"];
        $myObj->disponibles        = $row["disponibles"];
        $myObj->descripcion       = $row["descripcion"];

        echo json_encode($myObj);
    }
} else {
    echo "0 results";
}

$conn->close();
?>
