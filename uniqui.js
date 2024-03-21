fetch("uniqui.php")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Username and role fetched successfully, update the display
            document.getElementById("usernameDisplay").textContent = data.username;
            document.getElementById("welcomedisplay").textContent = "Welcome, " + data.username;
        } else {
            // Handle error when fetching username or role
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
