import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PartiesController } from '@/domains/parties/parties.controller';
import { PartiesService } from '@/domains/parties/parties.service';
import { PartySchema } from '@/schemas/party.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Party', schema: PartySchema }]),
	],
	controllers: [PartiesController],
	providers: [PartiesService],
	exports: [PartiesService],
})
export class PartiesModule {}
