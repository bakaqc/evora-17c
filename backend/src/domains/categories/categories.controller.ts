import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

	@Get()
	async getAll() {
		return await this.categoriesService.getAll();
	}

	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.categoriesService.getOne(id);
	}
}
