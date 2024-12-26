import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from '@/domains/auth/auth.controller';
import { AuthService } from '@/domains/auth/auth.service';
import { OtpService } from '@/domains/auth/otp.service';
import { JwtStrategy } from '@/domains/auth/strategies/jwt.strategy';
import { NotifiesModule } from '@/domains/notifies/notifies.module';
import { UsersModule } from '@/domains/users/users.module';
import { UserSchema } from '@/schemas/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		NotifiesModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('jwt.secret'),
				signOptions: {
					expiresIn: configService.get<string>('jwt.signOptions.expiresIn'),
				},
			}),
			inject: [ConfigService],
		}),
		UsersModule,
	],
	controllers: [AuthController],
	providers: [AuthService, OtpService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
