document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Capture form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create the request body
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Send the form data to the backend using fetch API
    fetch('https://backend-silver-cbf905ca4c35.herokuapp.com/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Email sent successfully!') {
            alert('Your message has been sent successfully!');
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error processing your request.');
    });
});
