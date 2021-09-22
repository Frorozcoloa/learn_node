
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const mailConfig = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kathleen.hamill9@ethereal.emaill',
        pass: 'YacTqHvNdvHQQZ1AGX'
    }
});
module.exports = nodemailer.createTransport(mailConfig);