<?php
include_once("verified/connection.php");
$conn = connection();

$usernames = array();

// Fetch usernames from useracc table where role is "Employee"
$usernames_query = "SELECT username FROM useracc WHERE role = 'Employee'";
$usernames_result = $conn->query($usernames_query);

if ($usernames_result->num_rows > 0) {
    while ($username_row = $usernames_result->fetch_assoc()) {
        $usernames[] = $username_row["username"];
    }
}

header('Content-Type: application/json');
echo json_encode($usernames);

$conn->close();
?>
