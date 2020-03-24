let nodeMailer = require("nodemailer");

const FROM_EMAIL = process.env.MAILER_EMAIL;
const FROM_PASSWORD = process.env.MAILER_PASSWORD;

const transporter = nodeMailer.createTransport({
  maxConnection: 3,
  pool: true,
  host: process.env.MAILER_SMTP_HOST,
  secure: true,
  port: process.env.MAILER_SMTP_PORT,
  auth: {
    user: FROM_EMAIL,
    pass: FROM_PASSWORD
  }
});

module.exports.sendEmail = async (to, subject, body) => {
  let mailOptions = {
    from: FROM_EMAIL,
    to,
    subject,
    text: body
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return reject(error);
        return resolve(info);
      });
    });
  } catch (error) {
    console.log("error sending email", error);
  }
};