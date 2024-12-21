import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Voucher {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	user: Types.ObjectId;

	@Prop({ required: true, unique: true })
	code: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	value: number;

	@Prop({ required: true })
	start: Date;

	@Prop({ required: true })
	end: Date;

	@Prop({ required: true })
	maxUses: number;

	@Prop({ required: true })
	usedCount: number;

	@Prop({ default: false })
	isDeleted: boolean;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
