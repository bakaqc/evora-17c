import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReviewsController } from '@/domains/reviews/reviews.controller';
import { ReviewsService } from '@/domains/reviews/reviews.service';
import { BookingSchema } from '@/schemas/booking.schema';
import { ReviewSchema } from '@/schemas/review.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Review', schema: ReviewSchema },
			{ name: 'Booking', schema: BookingSchema },
		]),
	],
	controllers: [ReviewsController],
	providers: [ReviewsService],
	exports: [ReviewsService],
})
export class ReviewsModule {}
