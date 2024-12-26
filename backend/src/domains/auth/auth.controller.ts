import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@/domains/auth/auth.service';
import { Public } from '@/domains/auth/decorators/public.decorator';
import { LoginDto } from '@/domains/auth/dto/login.dto';
import { SendOTPDto, VerifyOTPDto } from '@/domains/auth/dto/otp.dto';
import { OtpService } from '@/domains/auth/otp.service';
import { CreateUserDto } from '@/domains/users/dto/createUser.dto';
import { UsersService } from '@/domains/users/users.service';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly otpService: OtpService,
		private readonly usersService: UsersService,
	) {}

	@Public()
	@Post('register')
	async create(@Body() CreateUserDto: CreateUserDto) {
		return await this.usersService.create(CreateUserDto);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		const user = await this.authService.validateUser(loginDto);
		return this.authService.login(user);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary:
			'Send OTP to verify email when register new user or change password',
	})
	@Post('send-otp')
	async sendOtp(@Body() SendOTPDto: SendOTPDto) {
		return this.otpService.sendOtp(SendOTPDto);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Verify OTP to register new user or change password',
	})
	@Post('verify-otp')
	async verifyOtp(@Body() VerifyOTPDto: VerifyOTPDto) {
		return this.otpService.verifyOtp(VerifyOTPDto);
	}
}
