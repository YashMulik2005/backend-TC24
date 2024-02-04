const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()

const sendmail = (receivermail, username, password, type) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
        }
    });
    let text = "";
    if (type == "POC") {
        text = "you get apointed as poc of college. your username and  password is as follow " + username + " , " + password;
    } else {
        text = "you get apointed as hod of college. your username and  password is as follow " + username + " , " + password;
    }

    const mailOptions = {
        from: process.env.email,
        to: receivermail,
        subject: 'Hackthon project',
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = sendmail;