document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submitBtn').addEventListener('click', function(){
        console.log("Register button clicked");

        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;

        console.log("Username:", username);
        console.log("Email:", email);

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    console.log("Response received:", xhr.responseText);
                    document.getElementById('responseMessage').innerText = xhr.responseText;
                } else {
                    console.error('Error:', xhr.status);
                }
            }
        };
        xhr.open('POST', 'AddHR.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        var formData = 'username=' + encodeURIComponent(username) + '&email=' + encodeURIComponent(email);
        console.log("Sending request with data:", formData);
        xhr.send(formData);
    });
}); 
