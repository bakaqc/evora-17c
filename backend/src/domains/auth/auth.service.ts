import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginDto } from '@/domains/auth/dto/login.dto';
import { User } from '@/schemas/user.schema';
import { verify } from '@/utils/verify.util';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(loginDto: LoginDto) {
		const user = await this.userModel.findOne({ email: loginDto.email });
		if (user && (await verify(user.hashedPassword, loginDto.password))) {
			if (!user.isVerified) {
				throw new UnauthorizedException(
					'Your account is not verified. Please verify your email.',
				);
			}

			this.logger.log(`User with email ${user.email} authenticated`);

			const result = user.toObject();
			delete result.hashedPassword;

			return result;
		}
		throw new UnauthorizedException('Invalid credentials');
	}

	async login(user: any) {
		const payload = { email: user.email, role: user.role, sub: user._id };

		const findUser = await this.userModel.findOne({ email: user.email });

		if (!findUser.isVerified) {
			throw new UnauthorizedException(
				'Your account is not verified. Please verify your email.',
			);
		}

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async verifyJwt(token: string) {
		try {
			return this.jwtService.verify(token);
		} catch {
			return null;
		}
	}
}
