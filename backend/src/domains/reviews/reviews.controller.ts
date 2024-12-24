import { Body, Controller, Post } from '@nestjs/common';
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
}
