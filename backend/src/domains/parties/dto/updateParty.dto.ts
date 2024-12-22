import { ApiPropertyOptional } from '@nestjs/swagger';

import { PartyOptionDto } from '@/domains/parties/dto/partyOption.dto';

export class UpdatePartyDto {
	@ApiPropertyOptional({ description: 'User Id who own parties' })
	user?: string;

	@ApiPropertyOptional({ description: 'Category of parties' })
	category?: string;

	@ApiPropertyOptional({ description: 'Party title' })
	title?: string;

	@ApiPropertyOptional({ description: 'Party description' })
	description?: string;

	@ApiPropertyOptional({
		description: 'Options for the party',
		type: [PartyOptionDto],
	})
	options?: PartyOptionDto[];

	@ApiPropertyOptional({ description: 'Party photos demo' })
	photos?: string[];

	@ApiPropertyOptional({ description: 'Party rating total' })
	ratingTotal?: number;

	@ApiPropertyOptional({ description: 'Party rating count' })
	ratingCount?: number;
}
