import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NotificationsService } from '@/domains/notifications/notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}
}
