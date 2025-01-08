export interface User {
	_id: string;
	fullName: string;
	email: string;
	hashedPassword: string;
	phoneNumber: string;
	address: string;
	dateOfBirth: Date;
	gender: 'male' | 'female';
	avatar: string;
	role: 'user' | 'admin' | 'super-admin';
	verificationCode?: string;
	verificationCodeExpires?: Date;
	isVerified?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface TableUser {
	key: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	role: string;
}
