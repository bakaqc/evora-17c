import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '@/domains/categories/categories.service';
import { CreateCategoryDto } from '@/domains/categories/dto/createCategory.dto';
import { UpdateCategoryDto } from '@/domains/categories/dto/updateCategory.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@ApiOperation({ summary: 'Create a new category' })
	@Post()
	async create(@Body() CreateCategoryDto: CreateCategoryDto) {
		return await this.categoriesService.create(CreateCategoryDto);
	}

	@ApiOperation({ summary: 'Fetch all categories' })
	@Get()
	async getAll() {
		return await this.categoriesService.getAll();
	}

	@ApiOperation({ summary: 'Fetch a category by ID' })
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.categoriesService.getOne(id);
	}

	@ApiOperation({ summary: 'Update a category by ID' })
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return await this.categoriesService.update(id, updateCategoryDto);
	}

	@ApiOperation({ summary: 'Delete a category by ID' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.categoriesService.delete(id);
	}
}
