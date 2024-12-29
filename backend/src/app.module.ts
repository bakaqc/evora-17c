import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import corsConfig from '@/config/cors.config';
import jwtConfig from '@/domains/auth/config/jwt.config';
import { DomainsModule } from '@/domains/domains.module';
import { configureCloudinary } from '@/domains/upload/config/cloudinary.config';
import { MorganMiddleware } from '@/middlewares/morgan.middleware';

@Module({
	imports: [
		ConfigModule.forRoot({ load: [corsConfig, jwtConfig], isGlobal: true }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('DATABASE_URL'),
			}),
			inject: [ConfigService],
		}),
		DomainsModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(MorganMiddleware).forRoutes('*');
	}

	constructor(private readonly configService: ConfigService) {
		configureCloudinary(this.configService);
	}
}
