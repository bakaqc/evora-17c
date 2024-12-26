import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendOTPDto {
	@ApiProperty({ description: 'Email address to receive the OTP' })
	@IsEmail()
	@IsNotEmpty()
	email: string;
}

export class VerifyOTPDto {
	@ApiProperty({ description: 'Email address to receive the OTP' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: 'OTP to verify' })
	@IsString()
	@IsNotEmpty()
	otp: string;
}
