document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    var formData = new FormData(this);

    // Send the form data to the server
    fetch("Login.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Check the received data in the console
        if (data.success) {
            // Login successful, redirect to the appropriate dashboard based on role
            if (data.role === "HR") {
                window.location.href = "Dashboard.html"; // Redirect HR users to Dashboard.html
            } else if (data.role === "Employee") {
                window.location.href = "EmployeeDashboard.html"; // Redirect Employee users to EmployeeDashboard.html
            } else if (data.role === "admin") {
                window.location.href = "AddHR.html"; // Redirect admin users to AddHR.html
            } else {
                // Unknown role, handle accordingly (redirect to a default page, show error message, etc.)
                console.error("Unknown role:", data.role);
                // You might want to display an error message here or redirect to a default page
            }
        } else {
            // Login failed, display error message
            document.getElementById("errorMessage").textContent = data.message;
            document.getElementById("errorMessage").style.display = "block"; // Display the error message
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("errorMessage").textContent = "An error occurred. Please try again later.";
        document.getElementById("errorMessage").style.display = "block"; // Display the error message
    });
});
