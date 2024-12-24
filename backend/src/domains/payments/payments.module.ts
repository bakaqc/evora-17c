import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookingsModule } from '@/domains/bookings/bookings.module';
import { MomoModule } from '@/domains/payments/momo/momo.module';
import { PaymentsController } from '@/domains/payments/payments.controller';
import { PaymentsService } from '@/domains/payments/payments.service';
import { ZalopayModule } from '@/domains/payments/zalopay/zalopay.module';
import { BookingSchema } from '@/schemas/booking.schema';
import { PaymentSchema } from '@/schemas/payment.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Payment', schema: PaymentSchema },
			{ name: 'Booking', schema: BookingSchema },
		]),
		BookingsModule,
		ZalopayModule,
		MomoModule,
	],
	controllers: [PaymentsController],
	providers: [PaymentsService],
	exports: [PaymentsService],
})
export class PaymentsModule {}
