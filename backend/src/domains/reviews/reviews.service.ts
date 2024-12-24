import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateReviewDto } from '@/domains/reviews/dto/createReview.dto';
import { UpdateReviewDto } from '@/domains/reviews/dto/updateReview.dto';
import { Booking } from '@/schemas/booking.schema';
import { Party } from '@/schemas/party.schema';
import { Review } from '@/schemas/review.schema';

@Injectable()
export class ReviewsService {
	private readonly logger = new Logger(ReviewsService.name);

	constructor(
		@InjectModel(Review.name) private readonly reviewModel: Model<Review>,
		@InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
		@InjectModel(Party.name) private readonly partyModel: Model<Party>,
	) {}

	async create(createReviewDto: CreateReviewDto) {
		const booking = await this.bookingModel.findById(createReviewDto.booking);
		if (!booking) throw new NotFoundException('Booking not found');

		if (new Date() <= booking.organizeDate) {
			throw new BadRequestException(
				'Cannot create review before the event has finished',
			);
		}

		const createdReview = new this.reviewModel(createReviewDto);
		this.logger.debug('Creating review', createdReview);

		const party = await this.partyModel.findById(booking.party);
		if (!party) throw new NotFoundException('Party not found');

		party.ratingTotal += createdReview.rating;
		party.ratingCount += 1;
		await party.save();
		await createdReview.save();

		this.logger.log('Review created');
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
		if (!review) throw new NotFoundException('Review not found');
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

	async update(id: string, updateReviewDto: UpdateReviewDto) {
		const review = await this.reviewModel.findById(id);
		if (!review) throw new NotFoundException('Review not found');

		const booking = await this.bookingModel.findById(review.booking);
		const party = await this.partyModel.findById(booking.party);
		if (!party) throw new NotFoundException('Party not found');

		party.ratingTotal += updateReviewDto.rating - review.rating;
		await party.save();

		this.logger.debug('Updating rating total for party', updateReviewDto);
		const updatedReview = await this.reviewModel.findByIdAndUpdate(
			id,
			updateReviewDto,
			{ new: true },
		);
		await updatedReview.save();

		this.logger.log('Review updated');
		return {
			success: true,
			message: 'Review updated successfully.',
			data: updatedReview,
		};
	}

	async delete(id: string) {
		const review = await this.reviewModel.findById(id);
		if (!review) throw new NotFoundException('Review not found');

		const booking = await this.bookingModel.findById(review.booking);
		const party = await this.partyModel.findById(booking.party);
		if (!party) throw new NotFoundException('Party not found');

		party.ratingTotal -= review.rating;
		party.ratingCount = Math.max(0, party.ratingCount - 1);
		await party.save();

		await this.reviewModel.findByIdAndDelete(id);
		this.logger.log('Review deleted');

		return { success: true, message: 'Review deleted successfully.' };
	}
}
