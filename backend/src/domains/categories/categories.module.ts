import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from '@/domains/categories/categories.controller';
import { CategoriesService } from '@/domains/categories/categories.service';
import { CategorySchema } from '@/schemas/category.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
	],
	controllers: [CategoriesController],
	providers: [CategoriesService],
	exports: [CategoriesService],
})
export class CategoriesModule {}
