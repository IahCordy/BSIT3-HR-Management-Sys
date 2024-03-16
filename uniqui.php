<?php
// Start session
session_start();

// Check if username is set in the session
if(isset($_SESSION['username'])) {
    // Return username
    echo json_encode(array('success' => true, 'username' => $_SESSION['username']));
} else {
    // Username not found in session
    echo json_encode(array('success' => false, 'message' => 'Username not found in session.'));
}
?>
