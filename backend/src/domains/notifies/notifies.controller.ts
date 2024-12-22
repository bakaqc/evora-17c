import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NotifiesService } from '@/domains/notifies/notifies.service';

@ApiTags('Notifies')
@Controller('notifies')
export class NotifiesController {
	constructor(private readonly notifiesService: NotifiesService) {}
}
