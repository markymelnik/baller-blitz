import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'markymelnik@gmail.com',
		pass: 'bzup mycs yogc isut',
	}
})

export const sendVerificationEmail = async (userEmail: string, token: string) => {
	const verificationUrl = `http://localhost:4000/verify?token=${token}`;
	
	const mailOptions = {
		from: 'Cool App',
		to: userEmail,
		subject: 'Verify Email Address',
		html: `Click the link brlow or paste it into your browser to complete the signup process.<br/><a href="${verificationUrl}">Verify email</a>`,
	}

	try {
		await transporter.sendMail(mailOptions);
		console.log('Verification Email sent');
	} catch (error) {
    console.error('Failed to send verification email', error);
  throw error;
	}
}