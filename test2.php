<?php
include_once("verified/connection.php");
$con = connection();

// Specify the role you want to filter
$role = "Employee";

// Prepare and execute the SQL query to select usernames based on the role
$sql = "SELECT username FROM useracc WHERE role = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $role);
$stmt->execute();
$result = $stmt->get_result();

// Prepare the HTML content
$htmlContent = "";

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $username = $row["username"];

        // Fetch rating for the current user
        $rating = 0; // Default rating
        $ratingSql = "SELECT rating FROM performance WHERE username = ?";
        $ratingStmt = $con->prepare($ratingSql);
        $ratingStmt->bind_param("s", $username);
        $ratingStmt->execute();
        $ratingResult = $ratingStmt->get_result();
        if ($ratingRow = $ratingResult->fetch_assoc()) {
            $rating = $ratingRow["rating"];
        }

        // Build HTML content for each user
        $htmlContent .= "<tr>";
        $htmlContent .= "<td class='editbody'>$username</td>";
        $htmlContent .= "<td class='editbody'>";
        // HTML structure for ratings input
        $htmlContent .= "<div class='ratings-wrapper'>";
        $htmlContent .= "<div data-username='$username' class='ratings' data-rating='$rating'>";
        $htmlContent .= "<span data-rating='5' onclick='updateRating(this)'>&#9733;</span>";
        $htmlContent .= "<span data-rating='4' onclick='updateRating(this)'>&#9733;</span>";
        $htmlContent .= "<span data-rating='3' onclick='updateRating(this)'>&#9733;</span>";
        $htmlContent .= "<span data-rating='2' onclick='updateRating(this)'>&#9733;</span>";
        $htmlContent .= "<span data-rating='1' onclick='updateRating(this)'>&#9733;</span>";
        $htmlContent .= "</div>";
        $htmlContent .= "</div>";
        $htmlContent .= "</td>";
        $htmlContent .= "</tr>";
    }
} else {
    $htmlContent = "<tr><td colspan='2'>No employees found with role '$role'</td></tr>";
}

// Close the database connection
$stmt->close();
$con->close();

// Send the HTML content
echo $htmlContent;
?>