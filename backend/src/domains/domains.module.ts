import { Module } from '@nestjs/common';

import { CategoriesModule } from '@/domains/categories/categories.module';
import { PartiesModule } from '@/domains/parties/parties.module';
import { UsersModule } from '@/domains/users/users.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [UsersModule, CategoriesModule, VouchersModule, PartiesModule],
})
export class DomainsModule {}
