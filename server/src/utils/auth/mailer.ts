import nodemailer from 'nodemailer';
import { BACKEND_URL, MAILER_PASS, MAILER_USER } from '../../env';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: `${MAILER_USER}`,
		pass: `${MAILER_PASS}`,
	}
})

export const sendVerificationEmail = async (userEmail: string, token: string) => {
	const verificationUrl = `${BACKEND_URL}/verify-email?token=${token}`;
	
	const mailOptions = {
		from: 'Baller Blitz',
		to: userEmail,
		subject: 'Verify Email Address',
		html: `Click the link below or paste it into your browser to complete the signup process!<br/><br/><a href="${verificationUrl}">${verificationUrl}</a>`,
	}

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
    console.error('Failed to send verification email', error);
  throw error;
	}
}