const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAILS,
        pass: process.env.SMTP_APP_PASSWORDS,
    },
});

transporter.verify((error) => {
    if (error) console.log('SMTP error:', error);
    else console.log('SMTP connection ready');
});

const fromAddress = () => `"Denture Dental Clinic" <${process.env.SMTP_EMAILS}>`;

const sendAdminEmail = async ({ subject, html, replyTo }) => {
    await transporter.sendMail({
        from: fromAddress(),
        to: process.env.ADMIN_EMAIL,
        subject,
        html,
        replyTo: replyTo || process.env.SMTP_EMAILS,
    });
};

const sendPatientEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: fromAddress(),
        to,
        subject,
        html,
        replyTo: process.env.ADMIN_EMAIL,
    });
};

module.exports = { sendAdminEmail, sendPatientEmail };
