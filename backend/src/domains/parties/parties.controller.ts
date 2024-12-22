import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePartyDto } from '@/domains/parties/dto/createParty.dto';
import { PartiesService } from '@/domains/parties/parties.service';

@ApiTags('Parties')
@Controller('parties')
export class PartiesController {
	constructor(private readonly partiesService: PartiesService) {}

	@Post()
	async create(@Body() createPartyDto: CreatePartyDto) {
		return await this.partiesService.create(createPartyDto);
	}
}
