import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NotifyDto } from '@/domains/notifies/dto/notify.dto';
import { EmailService } from '@/domains/notifies/email.service';
import { UsersService } from '@/domains/users/users.service';
import { Notify } from '@/schemas/notifies.schema';

@Injectable()
export class NotifiesService {
	private readonly logger = new Logger(NotifiesService.name);

	constructor(
		@InjectModel(Notify.name) private readonly notifyModel: Model<Notify>,
		private readonly usersService: UsersService,
		private readonly emailService: EmailService,
	) {}

	async sendPartyNotification(
		notifyDto: NotifyDto,
		template: 'welcome' | 'verifyOTP' | 'bookingSuccess',
	) {
		const notification = new this.notifyModel(notifyDto);
		await notification.save();

		for (const userId of notifyDto.users) {
			try {
				const user = await this.usersService.getOne(userId);

				if (!user?.data?.email) {
					this.logger.warn(
						`User with ID ${userId} does not exist or has no email.`,
					);
					continue;
				}

				const email = user.data.email;
				const subject = `[Evora] ${notifyDto.title}`;
				const text = notifyDto.message;

				await this.emailService.sendEmail(email, subject, text, template);
				this.logger.log(`Email sent to ${email} successfully.`);
			} catch (error) {
				this.logger.error(
					`Failed to send email to user with ID ${userId}:`,
					error,
				);
			}
		}

		return {
			success: true,
			message: 'Party notifications sent successfully.',
		};
	}
}
