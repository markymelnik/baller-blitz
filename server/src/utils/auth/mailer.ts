import nodemailer from 'nodemailer';
import { BACKEND_PORT, FRONTEND_URL } from '../../env';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'markymelnik@gmail.com',
		pass: 'bzup mycs yogc isut',
	}
})

export const sendVerificationEmail = async (userEmail: string, token: string) => {
	const verificationUrl = `${FRONTEND_URL}:${BACKEND_PORT}/verify-email?token=${token}`;
	
	const mailOptions = {
		from: 'Cool App',
		to: userEmail,
		subject: 'Verify Email Address',
		html: `Click the link below or paste it into your browser to complete the signup process.<br/><a href="${verificationUrl}">Verify email</a>`,
	}

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
    console.error('Failed to send verification email', error);
  throw error;
	}
}