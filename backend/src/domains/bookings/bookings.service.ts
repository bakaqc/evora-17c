import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Booking } from '@/schemas/booking.schema';

@Injectable()
export class BookingsService {
	private readonly logger = new Logger(BookingsService.name);

	constructor(
		@InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
	) {}
}
