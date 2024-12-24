import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookingsController } from '@/domains/bookings/bookings.controller';
import { BookingsService } from '@/domains/bookings/bookings.service';
import { BookingSchema } from '@/schemas/booking.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
	],
	controllers: [BookingsController],
	providers: [BookingsService],
	exports: [BookingsService],
})
export class BookingsModule {}
