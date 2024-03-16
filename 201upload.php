<?php
include_once("verified/connection.php"); // Include the database connection file
$conn = connection(); // Establish database connection

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["file"]) && isset($_POST["username"])) {
    // Retrieve username and file information from the form
    $username = $_POST["username"];
    $file_name = $_FILES["file"]["name"];
    $file_tmp_name = $_FILES["file"]["tmp_name"];

    // Move uploaded file to a directory
    $uploads_dir = "uploads/";
    $destination = $uploads_dir . $file_name;

    // Move uploaded file to the destination directory
    if (move_uploaded_file($file_tmp_name, $destination)) {
        // Check if the username exists in the useracc table
        $check_username_query = "SELECT * FROM useracc WHERE username = '$username'";
        $check_username_result = $conn->query($check_username_query);

        if ($check_username_result->num_rows > 0) {
            // Insert file details into fileupload table
            $sql = "INSERT INTO fileupload (filename, username) VALUES ('$file_name', '$username')";
            if ($conn->query($sql) === TRUE) {
                $success_message = "File uploaded successfully!";
            } else {
                $error_message = "Error: " . $sql . "<br>" . $conn->error;
            }
        } else {
            $error_message = "Username does not exist.";
        }
    } else {
        $error_message = "Error uploading file.";
    }
} else {
    $error_message = "Invalid request.";
}

$conn->close(); // Close the database connection
?>
