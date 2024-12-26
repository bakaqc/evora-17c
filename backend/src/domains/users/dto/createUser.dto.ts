import { ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsEmail,
	IsIn,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ description: 'User full name' })
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@ApiProperty({ description: 'User email' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: 'User password' })
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty({ description: 'User phone number' })
	@IsPhoneNumber('VN')
	@IsNotEmpty()
	phoneNumber: string;

	@ApiProperty({ description: 'User address' })
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty({ description: 'User date of birth' })
	@IsDateString()
	@IsNotEmpty()
	dateOfBirth: Date;

	@ApiProperty({ description: 'User gender' })
	@IsIn(['male', 'female'])
	@IsNotEmpty()
	gender: string;

	@ApiProperty({ description: 'User avatar' })
	@IsString()
	@IsNotEmpty()
	avatar: string;
}
