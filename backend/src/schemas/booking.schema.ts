import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Booking {
	@Prop({ type: Types.ObjectId, ref: 'Party', required: true })
	party: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	user: Types.ObjectId;

	@Prop({ required: true })
	guestCount: number;

	@Prop({ required: true })
	bookingStatus: 'PENDING' | 'APPROVED' | 'CANCELLED';

	@Prop({ type: Types.ObjectId, ref: 'Payment', required: true })
	payment: Types.ObjectId;

	@Prop({ required: true })
	organizeDate: Date;

	@Prop({ required: true })
	organizedAt: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
