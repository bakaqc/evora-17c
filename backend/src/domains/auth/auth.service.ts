import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NotifiesService } from '@/domains/notifies/notifies.service';
import { User } from '@/schemas/user.schema';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private readonly notifiesService: NotifiesService,
	) {}
}
