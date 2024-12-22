import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Review {
	@Prop({ type: Types.ObjectId, ref: 'Party', required: true })
	party: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	user: Types.ObjectId;

	@Prop({ required: true })
	rating: number;

	@Prop({ required: true })
	comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
