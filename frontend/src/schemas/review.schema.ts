import { Booking } from '@/schemas/booking.schema';

export interface Review {
	_id: string;
	booking: Booking;
	rating: number;
	comment: string;
	createdAt?: Date;
	updatedAt?: Date;
}
