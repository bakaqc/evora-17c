import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailService } from '@/domains/notifies/email.service';
import { NotifiesController } from '@/domains/notifies/notifies.controller';
import { NotifiesService } from '@/domains/notifies/notifies.service';
import { UsersModule } from '@/domains/users/users.module';
import { NotifySchema } from '@/schemas/notify.schema';
import { UserSchema } from '@/schemas/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Notify', schema: NotifySchema },
			{ name: 'User', schema: UserSchema },
		]),
		UsersModule,
	],
	controllers: [NotifiesController],
	providers: [NotifiesService, EmailService],
	exports: [NotifiesService],
})
export class NotifiesModule {}
