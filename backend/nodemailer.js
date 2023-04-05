/* const nodemailer = require('nodemailer');

const sendQuoteEmail = async (to, subject, text, attachments) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'techctlaustralia@gmail.com',
      pass: 'CTLadmin007',
    },
  });

  const mailOptions = {
    from: 'techctlaustralia@gmail.com',
    to,
    subject,
    text,
    attachments,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
 */

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
   });

   transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
   });