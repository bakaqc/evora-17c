import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { emailBookingSuccess } from '@/domains/notifies/templateEmail/emailBookingSuccess';
import { emailSignature } from '@/domains/notifies/templateEmail/emailSignature';
import { emailVerifyOTP } from '@/domains/notifies/templateEmail/emailVerifyOTP';
import { emailWelcome } from '@/domains/notifies/templateEmail/emailWelcome';

@Injectable()
export class EmailService {
	private readonly transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
			debug: true,
			logger: true,
			secure: true,
			tls: {
				rejectUnauthorized: false,
			},
		});
	}

	async sendEmail(
		to: string,
		subject: string,
		text: string,
		template: 'welcome' | 'verifyOTP' | 'bookingSuccess',
	) {
		let htmlContent = '';

		switch (template) {
			case 'welcome':
				htmlContent = emailWelcome.replace('{{USERNAME}}', text);
				break;
			case 'verifyOTP':
				htmlContent = emailVerifyOTP.replace('{{OTP_CODE}}', text);
				break;
			case 'bookingSuccess':
				htmlContent = emailBookingSuccess.replace('{{EVENT_NAME}}', text);
				break;
			default:
				htmlContent = text;
		}

		let signature = emailSignature;
		if (typeof signature === 'string') {
			signature = signature
				.replaceAll(
					'{{WEBSITE}}',
					process.env.FRONTEND_URL || 'https://evora-k17.onrender.com',
				)
				.replaceAll(
					'{{EMAIL}}',
					process.env.EMAIL_USERNAME || 'evora.17c@gmail.com',
				);
		}

		const mailOptions = {
			from: process.env.EMAIL_USERNAME,
			to,
			subject,
			html: htmlContent + signature,
		};

		try {
			await this.transporter.sendMail(mailOptions);
		} catch (error) {
			console.error('Error sending email:', error);
		}
	}
}
