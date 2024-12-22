import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notify {
	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'User', required: true })
	users: Types.ObjectId[];

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	message: string;
}

export const NotifySchema = SchemaFactory.createForClass(Notify);
