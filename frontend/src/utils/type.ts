export type Payload = {
	fullName?: string;
	email?: string;
	phoneNumber?: string;
	dateOfBirth?: string | null;
	address?: string;
	gender?: string;
	password?: string;
};
export type PayloadForOtp = {
	email: string;
	otp: string;
};
export type PayloadForLogin = {
	email: string;
	password: string;
};
