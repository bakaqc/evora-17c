import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Review } from '@/schemas/review.schema';

@Injectable()
export class ReviewsService {
	private readonly logger = new Logger(ReviewsService.name);

	constructor(
		@InjectModel(Review.name) private readonly reviewModel: Model<Review>,
	) {}
}
