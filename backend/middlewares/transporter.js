const nodemailer = require("nodemailer");
require('dotenv').config()
 const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 587,
secure: false, // true for 465, false for other ports
auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASS_KEY,
},});
module.exports = transporter
