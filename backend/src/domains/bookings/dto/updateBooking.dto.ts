import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookingDto {
	@ApiPropertyOptional({ description: 'Party ID have booked by user' })
	party?: string;

	@ApiPropertyOptional({ description: 'User Id who book party' })
	user?: string;

	@ApiPropertyOptional({ description: 'Guest count of parties' })
	guestCount?: number;

	@ApiPropertyOptional({ description: 'Booking status' })
	status?: 'PENDING' | 'APPROVED' | 'CANCELLED';

	@ApiPropertyOptional({
		description: 'Payment Id which pay for party booking',
	})
	payment?: string;

	@ApiPropertyOptional({ description: 'Organize date of party' })
	organizeDate?: Date;

	@ApiPropertyOptional({ description: 'Organized at address of party' })
	organizedAt?: string;
}
