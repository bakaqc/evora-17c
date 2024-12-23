import { Body, Controller, Post } from '@nestjs/common';

import { SendEmailDto } from './dto/sendEmail.dto';
import { NotifiesService } from './notifies.service';

@Controller('notifies')
export class NotifiesController {
	constructor(private readonly notifiesService: NotifiesService) {}

	@Post('send-party-notification')
	async sendPartyNotification(@Body() sendEmailDto: SendEmailDto) {
		const { notifyDto, template } = sendEmailDto;
		return this.notifiesService.sendPartyNotification(notifyDto, template);
	}
}
