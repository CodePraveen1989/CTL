const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
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

		await transporter.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
