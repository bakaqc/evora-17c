import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

import { PartyOptionDto } from '@/domains/parties/dto/partyOption.dto';

export class CreatePartyDto {
	@ApiProperty({ description: 'User Id who own parties' })
	@IsMongoId()
	@IsNotEmpty()
	user: string;

	@ApiProperty({
		description: 'Category of parties',
		enum: ['Sinh nhật', 'Đám cưới', 'Khai trương', 'Thôi nôi'],
	})
	@IsString()
	@IsNotEmpty()
	@IsEnum(['Sinh nhật', 'Đám cưới', 'Khai trương', 'Thôi nôi'])
	category: string;

	@ApiProperty({ description: 'Party title' })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ description: 'Party description' })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({
		description: 'Options for the party',
		type: [PartyOptionDto],
		example: [
			{ type: 'Basic', price: 0 },
			{ type: 'Premium', price: 0 },
			{ type: 'VIP', price: 0 },
		],
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => PartyOptionDto)
	options: PartyOptionDto[];

	@ApiProperty({ description: 'Party photos demo' })
	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty()
	photos: string[];

	@ApiProperty({ description: 'Party rating total' })
	@IsNumber()
	@IsOptional()
	ratingTotal: number;

	@ApiProperty({ description: 'Party rating count' })
	@IsNumber()
	@IsOptional()
	ratingCount: number;
}
