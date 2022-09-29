const nodemailer = require("nodemailer");

async (email,subject,text) => {
    try {
        
        const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.GMAIL,
				pass: process.env.PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.GMAIL,
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
}

