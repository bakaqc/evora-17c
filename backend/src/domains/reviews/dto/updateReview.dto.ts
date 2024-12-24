import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
	@ApiPropertyOptional({ description: 'Booking Id which booked by user' })
	booking?: string;

	@ApiPropertyOptional({ description: 'Rating of user ' })
	rating?: string;

	@ApiPropertyOptional({ description: 'Comment of user' })
	comment?: string;
}
