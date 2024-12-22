import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifiesController } from '@/domains/notifies/notifies.controller';
import { NotifiesService } from '@/domains/notifies/notifies.service';
import { NotifySchema } from '@/schemas/notifies.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Notify', schema: NotifySchema }]),
	],
	controllers: [NotifiesController],
	providers: [NotifiesService],
	exports: [NotifiesService],
})
export class NotifiesModule {}
