import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	fullName: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	hashedPassword: string;

	@Prop({ required: true })
	phoneNumber: string;

	@Prop({ required: true })
	address: string;

	@Prop({ required: true })
	dateOfBirth: Date;

	@Prop({ required: true })
	gender: 'male' | 'female';

	@Prop({ required: true })
	avatar: string;

	@Prop({ required: true, default: 'user' })
	role: 'user' | 'admin' | 'super-admin';

	@Prop({ required: false, default: null })
	verificationCode: string;

	@Prop({ required: false, default: null })
	verificationCodeExpires: Date;

	@Prop({ default: false })
	isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
