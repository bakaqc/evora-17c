import { Module } from '@nestjs/common';

import { NotifiesModule } from '@/domains/notifies/notifies.module';
import { PartiesModule } from '@/domains/parties/parties.module';
import { PaymentsModule } from '@/domains/payments/payments.module';
import { UsersModule } from '@/domains/users/users.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [
		UsersModule,
		VouchersModule,
		PartiesModule,
		NotifiesModule,
		PaymentsModule,
	],
})
export class DomainsModule {}
