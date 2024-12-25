import {
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

	async sendOtp(sendOTPDto: SendOTPDto) {
		const user = await this.userModel.findOne({ email: sendOTPDto.email });

		if (!user) {
			this.logger.error(`User not found with email: ${sendOTPDto.email}`);

			throw new NotFoundException('User not found');
		}

		const otp = Array.from({ length: 6 }, () =>
			Math.floor(Math.random() * 10),
		).join('');
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

		this.logger.debug(`Creating OTP for user: ${user.email}`);

		user.verificationCode = otp;
		user.verificationCodeExpires = expiresAt;

		await user.save();

		await this.notifiesService.sendPartyNotification(
			{
				title: 'OTP Verification',
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
