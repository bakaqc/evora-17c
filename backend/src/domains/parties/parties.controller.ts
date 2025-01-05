import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';

import { Public } from '@/domains/auth/decorators/public.decorator';
import { Roles } from '@/domains/auth/decorators/roles.decorator';
import { Role } from '@/domains/auth/enums/role.enum';
import { CreatePartyDto } from '@/domains/parties/dto/createParty.dto';
import { UpdatePartyDto } from '@/domains/parties/dto/updateParty.dto';
import { PartiesService } from '@/domains/parties/parties.service';

@ApiTags('Parties')
@ApiBearerAuth()
@Controller('parties')
export class PartiesController {
	constructor(private readonly partiesService: PartiesService) {}

	@Roles(Role.SUPER_ADMIN, Role.ADMIN)
	@ApiOperation({ summary: 'Create a new party - Super Admin & Admin only' })
	@Post()
	async create(@Body() createPartyDto: CreatePartyDto) {
		return await this.partiesService.create(createPartyDto);
	}

	@Public()
	@ApiOperation({ summary: 'Fetch all parties with pagination' })
	@ApiQuery({
		name: 'page',
		required: false,
		type: Number,
		example: 1,
		description: 'Page number, starts from 1',
	})
	@ApiQuery({
		name: 'limit',
		required: false,
		type: Number,
		example: 10,
		description: 'Number of items per page',
	})
	@Get()
	async getAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 10,
	) {
		return await this.partiesService.getAllWithPagination(page, limit);
	}

	@Public()
	@ApiOperation({ summary: 'Fetch a party by ID or Category' })
	@Get(':identifier')
	async getOne(@Param('identifier') identifier: string) {
		return this.partiesService.getOne(identifier);
	}

	@Roles(Role.SUPER_ADMIN, Role.ADMIN)
	@ApiOperation({ summary: 'Update a party by ID - Super Admin & Admin only' })
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updatePartyDto: UpdatePartyDto,
	) {
		return this.partiesService.update(id, updatePartyDto);
	}

	@Roles(Role.SUPER_ADMIN, Role.ADMIN)
	@ApiOperation({ summary: 'Delete a party by ID - Super Admin & Admin only' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.partiesService.delete(id);
	}
}
