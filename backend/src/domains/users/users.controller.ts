import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ChangePasswordDto } from '@/domains/users/dto/changePassword.dto';
import { UpdateUserDto } from '@/domains/users/dto/updateUser.dto';
import { UsersService } from '@/domains/users/users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Fetch all users' })
	@Get()
	async getAll() {
		return await this.usersService.getAll();
	}

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

	@ApiOperation({ summary: 'Delete a user by ID or Email' })
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
