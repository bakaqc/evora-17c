import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoryDto } from '@/domains/categories/dto/createCategory.dto';
import { Category } from '@/schemas/category.schema';

@Injectable()
export class CategoriesService {
	private readonly logger = new Logger(CategoriesService.name);

	constructor(
		@InjectModel(Category.name) private readonly categoryModel: Model<Category>,
	) {}

	async create(createCategoryDto: CreateCategoryDto) {
		const existingCategory = await this.categoryModel.findOne({
			name: createCategoryDto.name,
		});

		if (existingCategory) {
			this.logger.error(
				`Category with name ${createCategoryDto.name} already exists!`,
			);

			throw new ConflictException('Category already exists');
		}

		const createdCategory = new this.categoryModel(createCategoryDto);

		this.logger.debug(
			`Creating category with name ${createdCategory.name}`,
			createdCategory,
		);

		await createdCategory.save();

		this.logger.log(`Category with name ${createdCategory.name} created`);

		return {
			success: true,
			message: 'Category created successfully.',
			data: createdCategory,
		};
	}
}
