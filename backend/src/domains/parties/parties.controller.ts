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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiPagination } from '@/domains/auth/decorators/pagination.decorator';
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
	@ApiPagination()
	@Get()
	async getAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 10,
	) {
		return await this.partiesService.getAllWithPagination(page, limit);
	}

	@Public()
	@ApiOperation({ summary: 'Fetch parties by category with pagination' })
	@ApiPagination()
	@Get('category/:category')
	async getByCategory(
		@Param('category') category: string,
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 10,
	) {
		return await this.partiesService.getByCategoryWithPagination(
			category,
			page,
			limit,
		);
	}

	@Public()
	@ApiOperation({ summary: 'Fetch parties by organizer ID with pagination' })
	@ApiPagination()
	@Get('user/:userId')
	async getByUserId(
		@Param('userId') userId: string,
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 10,
	) {
		return await this.partiesService.getByUserIdWithPagination(
			userId,
			page,
			limit,
		);
	}

	@Public()
	@ApiOperation({ summary: 'Fetch a party by ID' })
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return this.partiesService.getOne(id);
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
