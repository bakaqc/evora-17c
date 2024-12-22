import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationsController } from '@/domains/notifications/notifications.controller';
import { NotificationsService } from '@/domains/notifications/notifications.service';
import { NotificationSchema } from '@/schemas/notification.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Notification', schema: NotificationSchema },
		]),
	],
	controllers: [NotificationsController],
	providers: [NotificationsService],
	exports: [NotificationsService],
})
export class NotificationsModule {}
