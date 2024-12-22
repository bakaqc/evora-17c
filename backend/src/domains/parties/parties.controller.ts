import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePartyDto } from '@/domains/parties/dto/createParty.dto';
import { PartiesService } from '@/domains/parties/parties.service';

@ApiTags('Parties')
@Controller('parties')
export class PartiesController {
	constructor(private readonly partiesService: PartiesService) {}

	@ApiOperation({ summary: 'Create a new party' })
	@Post()
	async create(@Body() createPartyDto: CreatePartyDto) {
		return await this.partiesService.create(createPartyDto);
	}

	@ApiOperation({ summary: 'Fetch all parties' })
	@Get()
	async getAll() {
		return await this.partiesService.getAll();
	}

	@ApiOperation({ summary: 'Fetch a party by ID or Category' })
	@Get(':identifier')
	async getOne(@Param('identifier') identifier: string) {
		return this.partiesService.getOne(identifier);
	}
}
