import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { PartyOptionDto } from '@/domains/parties/dto/partyOption.dto';

export class UpdatePartyDto {
	@ApiPropertyOptional({ description: 'User Id who own parties' })
	user?: string;

	@ApiPropertyOptional({
		description: 'Category of parties',
		enum: ['Sinh nhật', 'Đám cưới', 'Khai trương', 'Thôi nôi'],
	})
	@IsOptional()
	@IsEnum(['Sinh nhật', 'Đám cưới', 'Khai trương', 'Thôi nôi'])
	category?: string;

	@ApiPropertyOptional({ description: 'Party title' })
	title?: string;

	@ApiPropertyOptional({ description: 'Party description' })
	description?: string;

	@ApiPropertyOptional({
		description: 'Options for the party',
		type: [PartyOptionDto],
		example: [
			{ type: 'Basic', price: 0 },
			{ type: 'Premium', price: 0 },
			{ type: 'VIP', price: 0 },
		],
	})
	options?: PartyOptionDto[];

	@ApiPropertyOptional({ description: 'Party photos demo' })
	photos?: string[];

	@ApiPropertyOptional({ description: 'Party rating total' })
	ratingTotal?: number;

	@ApiPropertyOptional({ description: 'Party rating count' })
	ratingCount?: number;
}
