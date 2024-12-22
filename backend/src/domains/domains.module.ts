import { Module } from '@nestjs/common';

import { PartiesModule } from '@/domains/parties/parties.module';
import { UsersModule } from '@/domains/users/users.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [UsersModule, VouchersModule, PartiesModule],
})
export class DomainsModule {}
