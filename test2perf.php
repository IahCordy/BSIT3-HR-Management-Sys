<?php
include_once("verified/connection.php");
$con = connection();

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract data
    $username = $data['username'];
    $rating = $data['rating'];
    $month = $data['month'];
    $year = $data['year'];

    // Insert or update rating in the database
    $stmt = $con->prepare("REPLACE INTO performance (username, rating, month, year) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siii", $username, $rating, $month, $year);
    $stmt->execute();
    $stmt->close();
} else {
    // Handle other HTTP methods (GET, PUT, DELETE, etc.)
    http_response_code(405); // Method Not Allowed
}
?>