import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@/domains/auth/auth.module';
import { JwtAuthGuard } from '@/domains/auth/guards/jwt.guard';
import { RolesGuard } from '@/domains/auth/guards/roles.guard';
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
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class DomainsModule {}
