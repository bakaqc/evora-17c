import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoryDto } from '@/domains/categories/dto/createCategory.dto';
import { UpdateCategoryDto } from '@/domains/categories/dto/updateCategory.dto';
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

	async getAll() {
		const categories = await this.categoryModel.find().select('-__v');

		this.logger.log('Categories fetched successfully');

		return {
			success: true,
			message: 'Categories fetched successfully.',
			data: categories,
		};
	}

	async getOne(id: string) {
		const category = await this.categoryModel.findById(id).select('-__v');

		if (!category) {
			this.logger.error(`Category with id ${id} not found!`);

			throw new NotFoundException('Category not found');
		}

		this.logger.log(`Category with id ${id} fetched successfully`);

		return {
			success: true,
			message: 'Category fetched successfully.',
			data: category,
		};
	}

	async update(id: string, updateCategoryDto: UpdateCategoryDto) {
		const updatedCategory = await this.categoryModel.findByIdAndUpdate(
			id,
			updateCategoryDto,
			{ new: true },
		);

		if (!updatedCategory) {
			this.logger.error(`Category with id ${id} not found!`);
			throw new NotFoundException('Category not found');
		}

		this.logger.log(`Category with id ${id} updated successfully`);

		return {
			success: true,
			message: 'Category updated successfully.',
			data: updatedCategory,
		};
	}

	async delete(id: string) {
		const deletedCategory = await this.categoryModel.findByIdAndDelete(id);

		if (!deletedCategory) {
			this.logger.error(`Category with id ${id} not found!`);
			throw new NotFoundException('Category not found');
		}

		this.logger.log(`Category with id ${id} deleted successfully`);

		return {
			success: true,
			message: 'Category deleted successfully.',
		};
	}
}
