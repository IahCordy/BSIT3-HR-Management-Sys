<?php
// Include the database connection file
include_once("verified/connection.php");
$con = connection();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

if(isset($_POST['username']) && isset($_POST['email'])){
    $username = $_POST['username'];
    $email = $_POST['email'];
    $role = "Employee"; // Set the role to "Employee"

    // Generate a random password
    $password = generateRandomPassword(); // You need to define this function

    // Hash the password using SHA1
    $hashedPassword = sha1($password);

    // Insert user data into the database
    $sql = "INSERT INTO `useracc`(`username`, `email`, `password`, `role`) VALUES ('$username', '$email', '$hashedPassword', '$role')";
    $con->query($sql) or die($con->error);

    // Send email with the randomly generated password
    $result = sendEmail($email, $password, $username); // You need to define this function

    // Output result
    echo $result;
}

function generateRandomPassword($length = 8) {
    // Generate a random password
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $password = '';
    for ($i = 0; $i < $length; $i++) {
        $password .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $password;
}

function sendEmail($to, $password, $username) {
    // Send email using PHPMailer
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'nobodydontcare75@gmail.com'; // Your SMTP username
        $mail->Password   = 'bzec vzuv jrkf xtuo'; // Your SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587; // Check your SMTP port

        // Recipients
        $mail->setFrom('nobodydontcare75@gmail.com', 'Admin');
        $mail->addAddress($to); // Add a recipient

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Hello ' . $username; // Set the subject here
        $mail->Body    = 'Your randomly generated password is: ' . $password;

        $mail->send();
        return 'Email has been sent successfully';
    } catch (Exception $e) {
        return "Email could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
