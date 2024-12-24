import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReviewsService } from '@/domains/reviews/reviews.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}
}
