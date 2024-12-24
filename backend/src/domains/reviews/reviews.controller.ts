import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateReviewDto } from '@/domains/reviews/dto/createReview.dto';
import { ReviewsService } from '@/domains/reviews/reviews.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@ApiOperation({ summary: 'Create a new review' })
	@Post()
	async create(@Body() createReviewDto: CreateReviewDto) {
		return await this.reviewsService.create(createReviewDto);
	}

	@ApiOperation({ summary: 'Fetch all reviews' })
	@Get()
	async getAll() {
		return await this.reviewsService.getAll();
	}

	@ApiOperation({ summary: 'Fetch review by ID' })
	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.reviewsService.getById(id);
	}

	@ApiOperation({ summary: 'Fetch reviews by booking ID' })
	@Get('booking/:bookingId')
	async getByBookingId(@Param('bookingId') bookingId: string) {
		return await this.reviewsService.getByBookingId(bookingId);
	}
}
