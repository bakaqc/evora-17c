import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
	@ApiPropertyOptional({ description: 'User full name' })
	fullName: string;

	@ApiPropertyOptional({ description: 'User email' })
	email: string;

	@ApiPropertyOptional({ description: 'User phone number' })
	@IsPhoneNumber('VN')
	phoneNumber: string;

	@ApiPropertyOptional({ description: 'User address' })
	address: string;

	@ApiPropertyOptional({ description: 'User date of birth' })
	dateOfBirth: Date;

	@ApiPropertyOptional({ description: 'User gender' })
	@IsIn(['male', 'female'])
	gender: string;

	@ApiPropertyOptional({ description: 'User avatar' })
	avatar: string;

	@ApiPropertyOptional({ description: 'User role' })
	@IsIn(['user', 'admin', 'super-admin'])
	role: string;

	@ApiPropertyOptional({ description: 'User verification code' })
	verificationCode: string;

	@ApiPropertyOptional({ description: 'User verification code expires' })
	verificationCodeExpires: Date;

	@ApiPropertyOptional({ description: 'User is verified' })
	isVerified: boolean;
}
