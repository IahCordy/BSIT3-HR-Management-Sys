<?php
include_once("verified/connection.php");
$conn = connection();

$data = json_decode(file_get_contents("php://input"), true);

$fileId = $data['fileId'];
$username = $data['username'];

$response = array();

// Delete file from database
$sql = "DELETE FROM fileupload WHERE id = $fileId AND username = '$username'";
if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $conn->error;
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
