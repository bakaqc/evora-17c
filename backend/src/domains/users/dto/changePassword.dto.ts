import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
	@ApiProperty({ description: 'User current password' })
	@IsString()
	@IsNotEmpty()
	currentPassword: string;

	@ApiProperty({ description: 'User new password' })
	@IsString()
	@IsNotEmpty()
	newPassword: string;
}
