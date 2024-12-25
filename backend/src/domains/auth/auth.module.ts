import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from '@/domains/auth/auth.controller';
import { AuthService } from '@/domains/auth/auth.service';
import { OtpService } from '@/domains/auth/otp.service';
import { NotifiesModule } from '@/domains/notifies/notifies.module';
import { UserSchema } from '@/schemas/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		NotifiesModule,
	],
	controllers: [AuthController],
	providers: [AuthService, OtpService],
})
export class AuthModule {}
