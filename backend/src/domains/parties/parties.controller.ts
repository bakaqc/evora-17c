import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PartiesService } from '@/domains/parties/parties.service';

@ApiTags('Parties')
@Controller('parties')
export class PartiesController {
	constructor(private readonly partiesService: PartiesService) {}
}
