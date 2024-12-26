import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '@/domains/auth/decorators/public.decorator';
import { CreatePartyDto } from '@/domains/parties/dto/createParty.dto';
import { UpdatePartyDto } from '@/domains/parties/dto/updateParty.dto';
import { PartiesService } from '@/domains/parties/parties.service';

@ApiTags('Parties')
@ApiBearerAuth()
@Controller('parties')
export class PartiesController {
	constructor(private readonly partiesService: PartiesService) {}

	@ApiOperation({ summary: 'Create a new party' })
	@Post()
	async create(@Body() createPartyDto: CreatePartyDto) {
		return await this.partiesService.create(createPartyDto);
	}

	@Public()
	@ApiOperation({ summary: 'Fetch all parties' })
	@Get()
	async getAll() {
		return await this.partiesService.getAll();
	}

	@Public()
	@ApiOperation({ summary: 'Fetch a party by ID or Category' })
	@Get(':identifier')
	async getOne(@Param('identifier') identifier: string) {
		return this.partiesService.getOne(identifier);
	}

	@ApiOperation({ summary: 'Update a party by ID' })
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updatePartyDto: UpdatePartyDto,
	) {
		return this.partiesService.update(id, updatePartyDto);
	}

	@ApiOperation({ summary: 'Delete a party by ID' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.partiesService.delete(id);
	}
}
