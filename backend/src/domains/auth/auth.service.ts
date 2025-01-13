import {
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginDto } from '@/domains/auth/dto/login.dto';
import { User } from '@/schemas/user.schema';
import { hash } from '@/utils/hash.util';
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

		if (!user) {
			throw new NotFoundException(
				`Account with email: ${loginDto.email} does not exist`,
			);
		}

		const errors = [
			{
				condition: !(await verify(user.hashedPassword, loginDto.password)),
				message: 'Incorrect password',
			},
			{
				condition: !user.isVerified,
				message: 'Your account is not verified. Please verify your email.',
			},
		];

		const error = errors.find((err) => err.condition);
		if (error) {
			throw new UnauthorizedException(error.message);
		}

		this.logger.log(`User with email ${user.email} authenticated`);

		const result = user.toObject();
		delete result.hashedPassword;

		return result;
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

	async forgotPassword(loginDto: LoginDto) {
		const user = await this.userModel.findOne({ email: loginDto.email });

		if (!user) {
			throw new NotFoundException(
				`Account with email: ${loginDto.email} does not exist`,
			);
		}

		user.hashedPassword = await hash(loginDto.password);
		await user.save();

		return {
			message: 'Password has been reset',
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
