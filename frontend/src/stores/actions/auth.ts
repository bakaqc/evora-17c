import { toast } from 'react-toastify';
import { Dispatch } from 'redux';

import {
	VerifyPayload,
	apiLogin,
	apiRegister,
	apiSendOTP,
	apiVerifyOTP,
} from '@/services/auth';
import { actionTypes } from '@/stores/actions/actionTypes';
import { Payload, PayloadForLogin } from '@/utils/type';

interface RegisterSuccessAction {
	type: typeof actionTypes.REGISTER_SUCCES;
	msg: string; // Thông báo thành công
}

interface RegisterFailedAction {
	type: typeof actionTypes.REGISTER_FAILED;
	msg: string | null;
}
interface LoginSuccessAction {
	type: typeof actionTypes.LOGIN_SUCCESS;
	msg: string[]; // Thông báo thành công
}

interface LoginFailedAction {
	type: typeof actionTypes.LOGIN_FAIL;
	msg: string[] | null;
}
interface VerifySuccessAction {
	type: typeof actionTypes.VERIFY_SUCCESS;
	msg: string; // Thông báo thành công
}

interface VerifyFailedAction {
	type: typeof actionTypes.VERIFY_FAILED;
	msg: string | null;
}

export type RegisterActions = RegisterSuccessAction | RegisterFailedAction;
export type VerifyActions = VerifySuccessAction | VerifyFailedAction;
export type LoginActions = LoginSuccessAction | LoginFailedAction;
// Định nghĩa các kiểu riêng cho thành công và thất bại
interface LoginResponseSuccess {
	access_token: string;
}

interface LoginResponseFailed {
	message: string[];
	error: string;
	statusCode: number;
}

// Tổng hợp hai kiểu trên
export type LoginResponse = LoginResponseSuccess | LoginResponseFailed;

export const register =
	(payload: Payload) => async (dispatch: Dispatch<RegisterActions>) => {
		try {
			const response = await apiRegister(payload);
			console.log(response.success);
			if (response?.success === true) {
				dispatch({
					type: actionTypes.REGISTER_SUCCES,
					msg: response.message,
					data: response.data,
				});
				if (response?.data?.email) {
					console.log(response.data.email);
					await apiSendOTP(response.data.email);
				}
				toast.success(response.message);
			} else {
				dispatch({
					type: actionTypes.REGISTER_FAILED,
					msg: response.message,
					data: null,
				});
				toast.error(response.message);
			}
		} catch {
			dispatch({
				type: actionTypes.REGISTER_FAILED,
				msg: null,
			});
			toast.error('Email đã tồn tại');
		}
	};
export const login =
	(payload: PayloadForLogin) =>
	async (dispatch: Dispatch<LoginActions>): Promise<LoginResponse> => {
		try {
			const response = await apiLogin(payload);
			if ('access_token' in response) {
				dispatch({
					type: actionTypes.LOGIN_SUCCESS,
					msg: ['Login successfully'],
					isLogin: true,
					token: response.access_token,
				});
				toast.success('Login successfully');
				return { access_token: response.access_token };
			} else {
				dispatch({
					type: actionTypes.LOGIN_FAIL,
					msg: ['Login failed'],
					data: null,
				});
				toast.error('Login failed');
				return {
					message: response.message || ['Login failed'],
					error: 'Unauthorized',
					statusCode: 401,
				};
			}
		} catch {
			dispatch({
				type: actionTypes.LOGIN_FAIL,
				msg: ['Login failed'],
				data: null,
			});
			toast.error('Email hoặc mật khẩu không chính xác');
			return {
				message: ['An error occurred'],
				error: 'Unknown error',
				statusCode: 500,
			};
		}
	};
export const loginAdmin =
	(payload: PayloadForLogin) =>
	async (dispatch: Dispatch<LoginActions>): Promise<LoginResponse> => {
		try {
			const response = await apiLogin(payload);

			if ('access_token' in response) {
				dispatch({
					type: actionTypes.LOGIN_ADMIN_SUCCESS,
					msg: ['Login successfully'],
					isLoginAdmin: true,
					token: response.access_token,
				});
				toast.success('Login successfully');
				return { access_token: response.access_token };
			} else {
				dispatch({
					type: actionTypes.LOGIN_ADMIN_FAIL,
					msg: ['Login failed'],
					data: null,
				});
				toast.error('Login failed');
				return {
					message: response.message || ['Login failed'],
					error: 'Unauthorized',
					statusCode: 401,
				};
			}
		} catch {
			dispatch({
				type: actionTypes.LOGIN_ADMIN_FAIL,
				msg: ['Login failed'],
				data: null,
			});
			toast.error('Email hoặc mật khẩu không chính xác');
			return {
				message: ['An error occurred'],
				error: 'Unknown error',
				statusCode: 500,
			};
		}
	};
export const verifyOTP =
	(payload: VerifyPayload) => async (dispatch: Dispatch<VerifyActions>) => {
		try {
			const response = await apiVerifyOTP(payload);
			if (response?.success === true) {
				dispatch({
					type: actionTypes.VERIFY_SUCCESS,
					msg: response.message,
					data: response.data,
				});
				toast.success(response.message);
			} else if (response?.message === 'OTP expired') {
				dispatch({
					type: actionTypes.VERIFY_FAILED,
					msg: response.message,
					data: null,
				});
				toast.error(response.message);
				if (response?.data?.email) {
					console.log(response.data.email);
					await apiSendOTP(response.data.email);
				}
			}
		} catch {
			dispatch({
				type: actionTypes.VERIFY_FAILED,
				msg: 'An error occurred while verifying OTP.',
				data: null,
			});
			toast.error('An error occurred while verifying OTP.');
		}
	};
