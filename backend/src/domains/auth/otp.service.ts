import {
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';

import { SendOTPDto, VerifyOTPDto } from '@/domains/auth/dto/otp.dto';
import { NotifiesService } from '@/domains/notifies/notifies.service';
import { User } from '@/schemas/user.schema';

@Injectable()
export class OtpService {
	private readonly logger = new Logger(OtpService.name);

	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private readonly notifiesService: NotifiesService,
	) {}

	private generateSecureOtp(length: number): string {
		return Array.from({ length }, () => randomBytes(1)[0] % 10).join('');
	}

	async sendOtp(sendOTPDto: SendOTPDto) {
		const user = await this.userModel.findOne({ email: sendOTPDto.email });

		if (!user) {
			this.logger.error(`User not found with email: ${sendOTPDto.email}`);
			throw new NotFoundException('User not found');
		}

		if (
			user.verificationCodeExpires &&
			new Date() < user.verificationCodeExpires
		) {
			const remainingTime = Math.ceil(
				(user.verificationCodeExpires.getTime() - new Date().getTime()) / 1000,
			);

			this.logger.warn(
				`OTP is still valid for user: ${user.email}. Remaining time: ${remainingTime} seconds.`,
			);

			return {
				success: false,
				message: `OTP was sent earlier. Please try again in ${remainingTime} seconds.`,
			};
		}

		const otp = this.generateSecureOtp(6);
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

		this.logger.debug(`Creating OTP for user: ${user.email}`);

		user.verificationCode = otp;
		user.verificationCodeExpires = expiresAt;

		await user.save();

		await this.notifiesService.sendPartyNotification(
			{
				title: 'Mã OTP dùng để xác thực tài khoản',
				message: `${otp}`,
				users: [user._id.toString()],
			},
			'verifyOTP',
		);

		return {
			success: true,
			message: 'Sent OTP successfully.',
		};
	}

	async verifyOtp(verifyOTPDto: VerifyOTPDto) {
		const { email, otp } = verifyOTPDto;

		const user = await this.userModel.findOne({ email });

		if (!user) {
			this.logger.error(`User not found with email: ${email}`);
			throw new NotFoundException('User not found');
		}

		if (!user.verificationCode || user.verificationCode !== otp) {
			this.logger.error('Invalid OTP');
			throw new UnauthorizedException('Invalid OTP');
		}

		if (new Date() > user.verificationCodeExpires) {
			this.logger.error('OTP expired');
			throw new UnauthorizedException('OTP expired');
		}

		user.verificationCode = null;
		user.verificationCodeExpires = null;

		await user.save();

		this.logger.log(`User ${email} verified successfully`);

		return {
			success: true,
			message: 'OTP verified successfully.',
		};
	}
}
