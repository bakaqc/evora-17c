import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
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
import { ChangePasswordDto } from '@/domains/users/dto/changePassword.dto';
import { UpdateUserDto } from '@/domains/users/dto/updateUser.dto';
import { UsersService } from '@/domains/users/users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Roles(Role.SUPER_ADMIN)
	@ApiOperation({
		summary: 'Fetch all users with pagination - Super Admin only',
	})
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
		return await this.usersService.getAllWithPagination(page, limit);
	}

	@Public()
	@ApiOperation({ summary: 'Fetch a user by ID or Email' })
	@Get(':identifier')
	async getOne(@Param('identifier') identifier: string) {
		const isEmail = identifier.includes('@');
		return this.usersService.getOne(identifier, isEmail);
	}

	@ApiOperation({ summary: 'Update a user by ID or Email' })
	@Put(':identifier')
	async update(
		@Param('identifier') identifier: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		const isEmail = identifier.includes('@');
		return this.usersService.update(identifier, updateUserDto, isEmail);
	}

	@Roles(Role.SUPER_ADMIN)
	@ApiOperation({ summary: 'Delete a user by ID or Email  - Super Admin only' })
	@Delete(':identifier')
	async delete(@Param('identifier') identifier: string) {
		const isEmail = identifier.includes('@');
		return this.usersService.delete(identifier, isEmail);
	}

	@ApiOperation({ summary: 'Change password by Email' })
	@Put('change-password/:email')
	async changePassword(
		@Param('email') email: string,
		@Body() changePasswordDto: ChangePasswordDto,
	) {
		return this.usersService.changePassword(email, changePasswordDto);
	}
}
