const nodemailer = require("nodemailer");

const sendEmail = async (userEmail,subject,text) => {
    try {
        
        const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: process.env.EMAIL_PORT,
			secure: process.env.SECURE,
			auth: {
				user: process.env.GMAIL,
				pass: process.env.PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.GMAIL,
			to: userEmail, 
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");   

    } catch (error) {
        
        console.log("email not sent!");
		console.log(error);
		return error;

    }
}

module.exports = sendEmail;
