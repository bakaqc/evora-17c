import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Party } from '@/schemas/party.schema';

@Injectable()
export class PartiesService {
	private readonly logger = new Logger(PartiesService.name);

	constructor(
		@InjectModel(Party.name) private readonly partyModel: Model<Party>,
	) {}
}
