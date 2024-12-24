import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateReviewDto } from '@/domains/reviews/dto/createReview.dto';
import { UpdateReviewDto } from '@/domains/reviews/dto/updateReview.dto';
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

	@ApiOperation({ summary: 'Update review by ID' })
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateReviewDto: UpdateReviewDto,
	) {
		return await this.reviewsService.update(id, updateReviewDto);
	}

	@ApiOperation({ summary: 'Delete review by ID' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.reviewsService.delete(id);
	}
}
