import { Dispatch } from 'redux';

import { apiGetUser } from '@/services/user';
import { actionTypes } from '@/stores/actions/actionTypes';

export interface ApiResponseUser {
	success: boolean;
	message: string;
	data: {
		_id: string;
		fullName: string;
		email: string;
		phoneNumber: string;
		address: string;
		dateOfBirth: string;
		gender: string;
		role: string;
		verificationCode: string | null;
		verificationCodeExpires: string | null;
		isVerified: boolean;
		avatar: string;
		createdAt: string;
		updatedAt: string;
	};
}
export const getUser = (identifier: string) => {
	return async (dispatch: Dispatch): Promise<void> => {
		try {
			const response: ApiResponseUser = await apiGetUser(identifier);
			if (response.success) {
				dispatch({
					type: actionTypes.GET_USER,
					user: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.GET_USER,
					msg: response.message,
				});
			}
		} catch (error) {
			console.error('Error fetching user:', error);
			dispatch({
				type: actionTypes.GET_USER,
				user: null,
			});
		}
	};
};
