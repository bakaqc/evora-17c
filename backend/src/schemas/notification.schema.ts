import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification {
	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'User', required: false })
	users: Types.ObjectId[];

	@Prop({ type: Types.Array<Types.ObjectId>, ref: 'Event', required: false })
	events: Types.ObjectId[];

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	message: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
