import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsPhoneNumber, ValidateIf } from 'class-validator';

export class UpdateUserDto {
	@ApiPropertyOptional({ description: 'User full name' })
	@ValidateIf((o) => o.fullName !== undefined)
	fullName?: string;

	@ApiPropertyOptional({ description: 'User email' })
	@ValidateIf((o) => o.email !== undefined)
	email?: string;

	@ApiPropertyOptional({ description: 'User phone number' })
	@ValidateIf((o) => o.phoneNumber !== undefined)
	@IsPhoneNumber('VN', { message: 'Invalid phone number' })
	phoneNumber?: string;

	@ApiPropertyOptional({ description: 'User address' })
	@ValidateIf((o) => o.address !== undefined)
	address?: string;

	@ApiPropertyOptional({ description: 'User date of birth' })
	@ValidateIf((o) => o.dateOfBirth !== undefined)
	dateOfBirth?: Date;

	@ApiPropertyOptional({ description: 'User gender' })
	@ValidateIf((o) => o.gender !== undefined)
	@IsIn(['male', 'female'], { message: 'Gender must be male or female' })
	gender?: string;

	@ApiPropertyOptional({ description: 'User avatar' })
	@ValidateIf((o) => o.avatar !== undefined)
	avatar?: string;

	@ApiPropertyOptional({ description: 'User role' })
	@ValidateIf((o) => o.role !== undefined)
	@IsIn(['user', 'admin', 'super-admin'], {
		message: 'Role must be user, admin or super-admin',
	})
	role?: string;

	@ApiPropertyOptional({ description: 'User verification code' })
	@ValidateIf((o) => o.verificationCode !== undefined)
	verificationCode?: string;

	@ApiPropertyOptional({ description: 'User verification code expires' })
	@ValidateIf((o) => o.verificationCodeExpires !== undefined)
	verificationCodeExpires?: Date;

	@ApiPropertyOptional({ description: 'User is verified' })
	@ValidateIf((o) => o.isVerified !== undefined)
	isVerified?: boolean;
}
