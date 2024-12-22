import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '@/domains/categories/categories.service';
import { CreateCategoryDto } from '@/domains/categories/dto/createCategory.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	async create(@Body() CreateCategoryDto: CreateCategoryDto) {
		return await this.categoriesService.create(CreateCategoryDto);
	}
}
