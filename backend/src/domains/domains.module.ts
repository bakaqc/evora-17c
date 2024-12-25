import { Module } from '@nestjs/common';

import { AuthModule } from '@/domains/auth/auth.module';
import { BookingsModule } from '@/domains/bookings/bookings.module';
import { NotifiesModule } from '@/domains/notifies/notifies.module';
import { PartiesModule } from '@/domains/parties/parties.module';
import { PaymentsModule } from '@/domains/payments/payments.module';
import { ReviewsModule } from '@/domains/reviews/reviews.module';
import { UsersModule } from '@/domains/users/users.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [
		AuthModule,
		BookingsModule,
		NotifiesModule,
		PartiesModule,
		PaymentsModule,
		ReviewsModule,
		UsersModule,
		VouchersModule,
	],
})
export class DomainsModule {}
