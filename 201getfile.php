<?php
include_once("verified/connection.php");
$conn = connection();

$username = $_GET['username'];

$files = array();

// Fetch files uploaded by the specific username
// Fetch files uploaded by the specific username
$files_query = "SELECT id, filename FROM fileupload WHERE username = '$username'";

$files_result = $conn->query($files_query);

if ($files_result->num_rows > 0) {
    while ($file_row = $files_result->fetch_assoc()) {
        $files[] = $file_row;
    }
}

header('Content-Type: application/json');
echo json_encode($files);

$conn->close();
?>
