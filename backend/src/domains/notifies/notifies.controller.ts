import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NotifyDto } from '@/domains/notifies/dto/notify.dto';
import { NotifiesService } from '@/domains/notifies/notifies.service';

@ApiTags('Notifies')
@Controller('notifies')
export class NotifiesController {
	constructor(private readonly notifiesService: NotifiesService) {}

	@Post('send-party-notification')
	async sendPartyNotification(@Body() NotifyDto: NotifyDto) {
		return this.notifiesService.sendPartyNotification(NotifyDto);
	}
}
