import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@/domains/auth/auth.service';
import { SendOTPDto, VerifyOTPDto } from '@/domains/auth/dto/otp.dto';
import { OtpService } from '@/domains/auth/otp.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly otpService: OtpService,
	) {}

	@ApiOperation({ summary: 'Send OTP to register new user or change password' })
	@Post('send-otp')
	async sendOtp(@Body() SendOTPDto: SendOTPDto) {
		return this.otpService.sendOtp(SendOTPDto);
	}

	@ApiOperation({
		summary: 'Verify OTP to register new user or change password',
	})
	@Post('verify-otp')
	async verifyOtp(@Body() VerifyOTPDto: VerifyOTPDto) {
		return this.otpService.verifyOtp(VerifyOTPDto);
	}
}
