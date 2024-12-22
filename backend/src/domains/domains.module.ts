import { Module } from '@nestjs/common';

import { CategoriesModule } from '@/domains/categories/categories.module';
import { UsersModule } from '@/domains/users/users.module';

@Module({
	imports: [UsersModule, CategoriesModule],
})
export class DomainsModule {}
