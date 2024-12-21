import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '@/domains/users/dto/createUser.dto';
import { UsersService } from '@/domains/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() CreateUserDto: CreateUserDto) {
		return await this.usersService.create(CreateUserDto);
	}

	@Get()
	async getAll() {
		return await this.usersService.getAll();
	}
}
