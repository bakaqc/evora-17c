import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Notify } from '@/schemas/notifies.schema';

@Injectable()
export class NotifiesService {
	private readonly logger = new Logger(NotifiesService.name);

	constructor(
		@InjectModel(Notify.name) private readonly notifyModel: Model<Notify>,
	) {}
}
