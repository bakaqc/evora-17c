import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '@/domains/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
}
