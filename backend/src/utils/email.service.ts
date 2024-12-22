import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	async sendEmail(to: string, subject: string, text: string) {
		const mailOptions = {
			from: 'your-email@gmail.com',
			to,
			subject,
			text,
		};

		try {
			await this.transporter.sendMail(mailOptions);
		} catch (error) {
			console.error('Error sending email:', error);
		}
	}
}
