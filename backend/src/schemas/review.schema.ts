import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Review {
	@Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
	booking: Types.ObjectId;

	@Prop({ required: true })
	rating: number;

	@Prop({ required: true })
	comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
