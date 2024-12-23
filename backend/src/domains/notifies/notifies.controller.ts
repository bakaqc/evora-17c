import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SendEmailDto } from '@/domains/notifies/dto/sendEmail.dto';
import { NotifiesService } from '@/domains/notifies/notifies.service';

@ApiTags('Notifies')
@Controller('notifies')
export class NotifiesController {
	constructor(private readonly notifiesService: NotifiesService) {}

	@ApiOperation({
		summary:
			'Send email notification using template one of: welcome | verifyOTP | bookingSuccess',
	})
	@Post('send-email-notification')
	async sendPartyNotification(@Body() sendEmailDto: SendEmailDto) {
		const { notifyDto, template } = sendEmailDto;
		return this.notifiesService.sendPartyNotification(notifyDto, template);
	}
}
