import axiosConfig from '@/axiosConfig';
import { Payload } from '@/ultils/type';

interface LoginPayload {
	email: string;
	password: string;
}
export interface VerifyPayload {
	email: string;
	otp: string;
}
interface ApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
}
// Kiểu phản hồi khi đăng nhập thành công
interface LoginResponseSuccess {
	access_token: string;
}

// Kiểu phản hồi khi đăng nhập thất bại
interface LoginResponseFailed {
	message: string[];
	error: string;
	statusCode: number;
}

// Type tổng hợp cho LoginResponse
export type LoginResponse = LoginResponseSuccess | LoginResponseFailed;

export const apiRegister = (payload: Payload): Promise<ApiResponse<Payload>> =>
	new Promise((resolve, reject) => {
		axiosConfig({
			method: 'POST',
			url: '/api/auth/register',
			data: payload,
		})
			.then((response) => resolve(response?.data))
			.catch((err) => reject(new Error(err?.message || 'Failed to register')));
	});

export const apiLogin = (payload: LoginPayload): Promise<LoginResponse> =>
	new Promise((resolve, reject) => {
		axiosConfig({
			method: 'POST',
			url: '/api/auth/login',
			data: payload,
		})
			.then((response) => {
				if (response?.data?.access_token) {
					resolve({ access_token: response.data.access_token });
				} else {
					reject(
						new Error(
							JSON.stringify({
								message: response?.data?.message || ['Login failed'],
								error: 'Unauthorized',
								statusCode: 401,
							}),
						),
					);
				}
			})
			.catch((err) => {
				reject(
					new Error(
						JSON.stringify({
							message: ['An error occurred during login'],
							error: err?.message || 'Unknown error',
							statusCode: 500,
						}),
					),
				);
			});
	});

export const apiSendOTP = (email: string): Promise<ApiResponse<null>> =>
	new Promise((resolve, reject) => {
		axiosConfig({
			method: 'POST',
			url: '/api/auth/send-otp',
			data: { email },
		})
			.then((response) => resolve(response?.data))
			.catch((err) => reject(new Error(err?.message || 'Failed to send OTP')));
	});

export const apiVerifyOTP = (
	payload: VerifyPayload,
): Promise<ApiResponse<VerifyPayload>> =>
	new Promise((resolve, reject) => {
		axiosConfig({
			method: 'POST',
			url: '/api/auth/verify-otp',
			data: payload,
		})
			.then((response) => resolve(response?.data))
			.catch((err) =>
				reject(new Error(err?.message || 'Failed to verify OTP')),
			);
	});
