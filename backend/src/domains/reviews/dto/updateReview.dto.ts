import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
	@ApiPropertyOptional({ description: 'Booking Id which booked by user' })
	booking?: string;

	@ApiPropertyOptional({ description: 'Rating of user ' })
	rating?: number;

	@ApiPropertyOptional({ description: 'Comment of user' })
	comment?: string;
}
