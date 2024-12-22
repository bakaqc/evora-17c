import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class PartyOptionDto {
	@ApiProperty({
		description: 'Type of the party option',
		enum: ['Basic', 'Premium', 'VIP'],
	})
	@IsEnum(['Basic', 'Premium', 'VIP'])
	@IsNotEmpty()
	type: 'Basic' | 'Premium' | 'VIP';

	@ApiProperty({ description: 'Price of the party option' })
	@IsNumber()
	@IsNotEmpty()
	price: number;
}
