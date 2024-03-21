// Fetch usernames from the server and generate upload forms
window.onload = function() {
    fetch('201file.php')
        .then(response => response.json())
        .then(usernames => {
            const container = document.getElementById('fileUploadContainer');
            usernames.forEach(username => {
                const div = document.createElement('div');
                div.className = 'boxs mx-auto my-4 p-4 rounded-lg shadow-md';
                div.innerHTML = `
                    <h2 class="mb-4 text-center">Name: ${username}</h2>
                    <form id="uploadForm_${username}" enctype="multipart/form-data">
                        <input type="hidden" name="username" value="${username}">
                        <label for="file" class="block mt-2">Select File:</label>
                        <input type="file" id="file_${username}" name="file" required class="mt-2">
                        <br><br>
                        <button type="submit" class="uploadbttn">Upload</button>
                    </form>
                    <div id="${username}Files" class="mt-4"></div>
                `;
                container.appendChild(div);

                // Event listener for form submission
                const form = document.getElementById(`uploadForm_${username}`);
                form.addEventListener('submit', function(event) {
                    event.preventDefault(); // Prevent default form submission
                    const formData = new FormData(form);

        fetch('201upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(message => {
            if (message.startsWith('Error')) {
                alert(message); // Display error message if upload fails
            } else {
                // Reload the uploaded files for the current user
                    fetch(`201getfile.php?username=${username}`)
                        .then(response => response.json())
                        .then(files => {
                            const filesContainer = document.getElementById(`${username}Files`);
                            if (files.length > 0) {
                                let fileList = '<h3 class="tuploadfilez text-lg font-bold">Uploaded Files</h3><ul>';
                                files.forEach(file => {
                                    fileList += `<li class="fileEntry"><a href="uploads/${file.filename}" download>${file.filename}</a> <button class="deleteButton" data-fileid="${file.id}" data-username="${username}">Delete</button></li>`;
                                });
                                fileList += '</ul>';
                                filesContainer.innerHTML = fileList;
                            } else {
                                filesContainer.innerHTML = '<p class="text-sm">No files uploaded yet.</p>';
                            }

                            // Attach event listeners for delete buttons
                            attachDeleteButtonListeners();
                        });
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });

                // Fetch and display uploaded files
                fetch(`201getfile.php?username=${username}`)
                    .then(response => response.json())
                    .then(files => {
                        const filesContainer = document.getElementById(`${username}Files`);
                        if (files.length > 0) {
                            let fileList = '<h3 class="text-lg font-bold">Uploaded Files</h3><ul>';
                            files.forEach(file => {
                                fileList += `<li class="fileEntry"><a href="uploads/${file.filename}" download>${file.filename}</a> <button class="deleteButton text-white" data-fileid="${file.id}" data-username="${username}">Delete</button></li>`;
                            });
                            fileList += '</ul>';
                            filesContainer.innerHTML = fileList;
                        } else {
                            filesContainer.innerHTML = '<p class="text-sm">No files uploaded yet.</p>';
                        }

                        // Attach event listeners for delete buttons
                        attachDeleteButtonListeners();
                    });
            });
        });
};

// Function to attach event listeners to delete buttons
function attachDeleteButtonListeners() {
    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', function(event) {
            const fileId = this.getAttribute('data-fileid');
            const username = this.getAttribute('data-username');
            fetch('201delete.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fileId, username })
            })
            .then(response => response.json())
            .then(result => {
                // Handle result if needed, like removing the file from the UI
                console.log(result);
                if (result.success) {
                    // Remove the deleted file from the UI
                    const fileEntry = this.parentNode;
                    fileEntry.parentNode.removeChild(fileEntry);
                } else {
                    console.error('Error:', result.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
}

