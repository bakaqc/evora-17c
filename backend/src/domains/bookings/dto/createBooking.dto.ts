import { ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateBookingDto {
	@ApiProperty({ description: 'Party ID have booked by user' })
	@IsMongoId()
	@IsNotEmpty()
	party: string;

	@ApiProperty({ description: 'User Id who book party' })
	@IsMongoId()
	@IsNotEmpty()
	user: string;

	@ApiProperty({ description: 'Guest count of parties' })
	@IsNumber()
	@IsNotEmpty()
	guestCount: number;

	@ApiProperty({ description: 'Booking status' })
	@IsEnum(['PENDING', 'APPROVED', 'CANCELLED'])
	@IsNotEmpty()
	status: 'PENDING' | 'APPROVED' | 'CANCELLED';

	@ApiProperty({ description: 'Payment Id which pay for party booking' })
	@IsOptional()
	payment: string;

	@ApiProperty({ description: 'Organize date of party' })
	@IsDateString()
	@IsNotEmpty()
	organizeDate: Date;

	@ApiProperty({ description: 'Organized at address of party' })
	@IsString()
	@IsNotEmpty()
	organizedAt: string;
}
