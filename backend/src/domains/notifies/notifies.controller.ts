import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '@/domains/auth/decorators/public.decorator';
import { SendEmailDto } from '@/domains/notifies/dto/sendEmail.dto';
import { NotifiesService } from '@/domains/notifies/notifies.service';

@ApiTags('Notifies')
@ApiBearerAuth()
@Controller('notifies')
export class NotifiesController {
	constructor(private readonly notifiesService: NotifiesService) {}

	@Public()
	@ApiOperation({
		summary:
			'Send email notification using template one of: welcome | verifyOTP | custom',
	})
	@Post('send-email-notification')
	async sendPartyNotification(@Body() sendEmailDto: SendEmailDto) {
		const { notifyDto, template } = sendEmailDto;
		return this.notifiesService.sendPartyNotification(notifyDto, template);
	}
}
