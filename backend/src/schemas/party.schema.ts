import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Party {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	user: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Category', required: true })
	category: Types.ObjectId;

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
	attributes: { type: string; price: number }[];

	@Prop({ required: true })
	photos: string[];

	@Prop({ required: true })
	ratingTotal: number;

	@Prop({ required: true })
	ratingCount: number;
}

export const PartySchema = SchemaFactory.createForClass(Party);
