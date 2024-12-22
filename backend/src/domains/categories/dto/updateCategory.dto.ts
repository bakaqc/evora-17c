import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
	@ApiPropertyOptional({ description: 'Category name' })
	name?: string;

	@ApiPropertyOptional({ description: 'Category description' })
	description?: string;
}
