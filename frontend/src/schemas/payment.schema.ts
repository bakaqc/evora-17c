import { Voucher } from '@/schemas/voucher.schema';
import { Booking } from '@/schemas/booking.schema';

export interface Payment {
	_id: string;
	booking: Booking;
	voucher?: Voucher;
	originPrice: number;
	finalPrice: number;
	method: 'momo' | 'zalo-pay';
	createdAt?: Date;
	updatedAt?: Date;
}