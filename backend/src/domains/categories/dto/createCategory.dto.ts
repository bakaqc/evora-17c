import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty({ description: 'Category name' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'Category description' })
	@IsString()
	@IsNotEmpty()
	description: string;
}
