const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// POST route for sending email
app.post('/send-email', (req, res) => {
    const { name, email, service, message } = req.body;

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS     // Your email password
        }
    });

    // Set up email data
    const mailOptions = {
        from: email, // Use the email input from the form as the sender address
        to: 'osaisharan@gmail.com', // Recipient's email
        subject: 'Quote Request from ' + name,
        text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Serve index.html on root request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
