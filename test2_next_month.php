<?php
include_once("verified/connection.php");
$con = connection();

// Fetch data for the next month (this is just a hypothetical example)
$nextMonth = date('Y-m', strtotime('+1 month'));

// Prepare and execute the SQL query to select usernames and ratings for the next month
$sql = "SELECT username, rating FROM performance WHERE month = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $nextMonth);
$stmt->execute();
$result = $stmt->get_result();

// Prepare the HTML content
$htmlContent = "";

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $username = $row["username"];
        $rating = $row["rating"];

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
    $htmlContent = "<tr><td colspan='2'>No data found for the next month</td></tr>";
}

// Close the database connection
$stmt->close();
$con->close();

// Send the HTML content
echo $htmlContent;
?>
