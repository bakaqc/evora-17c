import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payment {
	@Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
	booking: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Voucher', required: false })
	voucher: Types.ObjectId;

	@Prop({ required: true })
	method: 'momo' | 'zalo-pay';

	@Prop({ required: true })
	originPrice: number;

	@Prop({ required: true })
	finalPrice: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
