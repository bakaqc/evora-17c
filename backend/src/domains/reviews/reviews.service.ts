import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateReviewDto } from '@/domains/reviews/dto/createReview.dto';
import { Booking } from '@/schemas/booking.schema';
import { Review } from '@/schemas/review.schema';

@Injectable()
export class ReviewsService {
	private readonly logger = new Logger(ReviewsService.name);

	constructor(
		@InjectModel(Review.name) private readonly reviewModel: Model<Review>,
		@InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
	) {}

	async create(createReviewDto: CreateReviewDto) {
		const booking = await this.bookingModel.findById(createReviewDto.booking);

		if (!booking) {
			throw new NotFoundException('Booking not found');
		}

		const organizeDateFinish = booking.organizeDate;

		const currentDate = new Date();

		if (currentDate <= organizeDateFinish) {
			throw new BadRequestException(
				'Cannot create review before the event has finished',
			);
		}

		const createdReview = new this.reviewModel(createReviewDto);

		this.logger.debug(`Creating review`, createdReview);

		await createdReview.save();

		this.logger.log(`Review created`);

		return {
			success: true,
			message: 'Review created successfully.',
			data: createdReview,
		};
	}

	async getAll() {
		const reviews = await this.reviewModel.find().select('-__v');

		this.logger.log('Reviews fetched successfully');

		return {
			success: true,
			message: 'Reviews fetched successfully.',
			data: reviews,
		};
	}

	async getById(id: string) {
		const review = await this.reviewModel.findById(id).select('-__v');

		if (!review) {
			throw new NotFoundException('Review not found');
		}

		this.logger.log('Review fetched successfully');

		return {
			success: true,
			message: 'Review fetched successfully.',
			data: review,
		};
	}

	async getByBookingId(bookingId: string) {
		const reviews = await this.reviewModel
			.find({ booking: bookingId })
			.select('-__v');

		this.logger.log('Reviews fetched successfully');

		return {
			success: true,
			message: 'Reviews fetched successfully.',
			data: reviews,
		};
	}
}
