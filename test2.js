document.addEventListener("DOMContentLoaded", function() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1; // Get current month
    let currentYear = currentDate.getFullYear();

    // Function to update the rating in the database
    function updateRating(username, rating) {
        fetch('test2perf.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                rating: rating,
                month: currentMonth,
                year: currentYear
            })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Log the response from the PHP script
            // Optionally, you can update the UI based on the response
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to add event listener to stars
    function addStarEventListeners() {
        const stars = document.querySelectorAll('.ratings span');
        stars.forEach(star => {
            star.addEventListener('click', function(event) {
                const ratingValue = this.dataset.rating;
                const username = this.parentNode.dataset.username;

                // Update the rating in the database
                updateRating(username, ratingValue);

                // Update UI to reflect selected rating for the specific username
                const usernameStars = document.querySelectorAll(`.ratings[data-username="${username}"] span`);
                usernameStars.forEach(usernameStar => {
                    if (usernameStar.dataset.rating <= ratingValue) {
                        usernameStar.style.color = 'yellow';
                    } else {
                        usernameStar.style.color = 'black'; // Change to original color if not selected
                    }
                });

                // Store rating in local storage
                localStorage.setItem(`${username}-${currentMonth}-${currentYear}`, ratingValue);
            });
        });
    }

// Function to fetch data and populate the table
function fetchDataAndPopulateTable() {
    // Fetch data from test2.php and populate the table
    fetch(`test2.php?month=${currentMonth}&year=${currentYear}`)
    .then(response => response.text())
    .then(data => {
        document.getElementById("performusername").innerHTML = data;

        // Restore ratings from local storage
        const stars = document.querySelectorAll('.ratings span');
        stars.forEach(star => {
            const username = star.parentNode.dataset.username;
            const storedRating = localStorage.getItem(`${username}-${currentMonth}-${currentYear}`);
            if (storedRating) {
                if (star.dataset.rating <= storedRating) {
                    star.style.color = 'yellow';
                } else {
                    star.style.color = 'black'; // Change to black if not rated
                }
            } else {
                star.style.color = 'black'; // Change to black if not rated
            }
        });

        // Add event listeners to stars after populating the table
        addStarEventListeners();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to update rating in the database
function deleteRating(username) {
    fetch('test2Delete.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            month: currentMonth,
            year: currentYear
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log the response from the PHP script
        // Reload table data after deletion
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

    // Initial table population
    fetchDataAndPopulateTable();

    // Function to update table for next month
    function nextMonth() {
        currentMonth++; // Increment month
        if (currentMonth > 12) {
            currentMonth = 1; // Reset to January if December is reached
            currentYear++; // Increment year
        }
        updateTable();
    }

    // Function to update table for previous month
    function prevMonth() {
        currentMonth--; // Decrement month
        if (currentMonth < 1) {
            currentMonth = 12; // Reset to December if January is reached
            currentYear--; // Decrement year
        }
        updateTable();
    }

    // Function to update table for next year
    function nextYear() {
        currentYear++; // Increment year
        updateTable();
    }

    // Function to update table for previous year
    function prevYear() {
        currentYear--; // Decrement year
        updateTable();
    }

    // Function to update table content
    function updateTable() {
        // Set the month and year directly
        document.getElementById("currentMonth").innerText = months[currentMonth - 1];
        document.getElementById("currentYear").innerText = currentYear;

        // Fetch data for the current month and populate the table
        fetchDataAndPopulateTable();
    }

    // Add event listeners to the buttons
    document.getElementById("nextMonth").addEventListener("click", nextMonth);
    document.getElementById("prevMonth").addEventListener("click", prevMonth);
    document.getElementById("nextYear").addEventListener("click", nextYear);
    document.getElementById("prevYear").addEventListener("click", prevYear);

    // Call updateTable() to apply ratings when the page loads
    updateTable();
});