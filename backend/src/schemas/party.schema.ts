import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Party {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	user: Types.ObjectId;

	@Prop({
		type: String,
		enum: ['Sinh nhật', 'Đám cưới', 'Khai trương', 'Thôi nôi'],
		required: true,
	})
	category: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({
		type: [
			{
				type: {
					type: String,
					enum: ['Basic', 'Premium', 'VIP'],
					required: true,
				},
				price: { type: Number, required: true },
			},
		],
	})
	options: { type: string; price: number }[];

	@Prop({ required: true })
	photos: string[];

	@Prop({ required: true, default: 0 })
	ratingTotal: number;

	@Prop({ required: true, default: 0 })
	ratingCount: number;
}

export const PartySchema = SchemaFactory.createForClass(Party);
