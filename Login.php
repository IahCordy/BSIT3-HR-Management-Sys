<?php
// Include the database connection file
include_once("verified/connection.php");
include_once("verified/Admin.php");

// Start session
session_start();

// Establish database connection for useracc table
$con_useracc = connection();

// Establish database connection for power table
$con_power = Admin();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve email and password from form
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Hash the password using SHA1
    $hashedPassword = sha1($password);

    // Prepare SQL statement to fetch user's hashed password from useracc table
    $sql_useracc = "SELECT id, username, role FROM useracc WHERE email = ? AND password = ?";

    // Prepare and bind parameters for useracc table
    $stmt_useracc = $con_useracc->prepare($sql_useracc);
    $stmt_useracc->bind_param("ss", $email, $hashedPassword);

    // Execute query for useracc table
    $stmt_useracc->execute();

    // Bind result variables for useracc table
    $stmt_useracc->bind_result($userId_useracc, $username_useracc, $role_useracc);

    // Fetch the result from useracc table
    if ($stmt_useracc->fetch()) {
        // Login successful from useracc table
        $_SESSION['userId'] = $userId_useracc;
        $_SESSION['username'] = $username_useracc;
        $_SESSION['role'] = $role_useracc;

        // Return success along with username and role
        echo json_encode(array('success' => true, 'username' => $username_useracc, 'role' => $role_useracc));
    } else {
        // Prepare SQL statement to fetch user's hashed password from power table
        $sql_power = "SELECT id, email FROM power WHERE email = ? AND password = ?";

        // Prepare and bind parameters for power table
        $stmt_power = $con_power->prepare($sql_power);
        $stmt_power->bind_param("ss", $email, $hashedPassword);

        // Execute query for power table
        $stmt_power->execute();

        // Bind result variables for power table
        $stmt_power->bind_result($userId_power, $email_power);

        // Fetch the result from power table
        if ($stmt_power->fetch()) {
            // Login successful from power table (assume admin role)
            $_SESSION['userId'] = $userId_power;
            $_SESSION['username'] = $email_power; // Storing email as username for admin
            $_SESSION['role'] = "admin"; // Fixed role for all users in power table

            // Return success along with username and role
            echo json_encode(array('success' => true, 'username' => $email_power, 'role' => "admin"));
        } else {
            // Login failed
            echo json_encode(array('success' => false, 'message' => 'Incorrect email or password. Please try again.'));
        }

        // Close statement and connection for power table
        $stmt_power->close();
        $con_power->close();
    }

    // Close statement and connection for useracc table
    $stmt_useracc->close();
    $con_useracc->close();
}
?>
