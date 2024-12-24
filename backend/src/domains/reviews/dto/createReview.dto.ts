import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
	@ApiProperty({ description: 'Booking Id which booked by user' })
	@IsMongoId()
	@IsNotEmpty()
	booking: string;

	@ApiProperty({ description: 'Rating of user ' })
	@IsNumber()
	@IsNotEmpty()
	rating: string;

	@ApiProperty({ description: 'Comment of user' })
	@IsString()
	@IsNotEmpty()
	comment: string;
}
