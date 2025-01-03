import { actionTypes } from '../actions/actionTypes';

import { Payload } from '@/ultils/type';

type AuthState = {
	isLogin: boolean;
	token: string | null;
	msg: string;
	update: boolean;
	msgSuccess: string;
	data: Payload;
};

type Action = {
	type: string;
	data?: Payload;
	access_token?: string;
	msg?: string;
};

const initState: AuthState = {
	isLogin: false,
	token: null,
	msg: '',
	update: false,
	msgSuccess: '',
	data: {},
};

const authReducer = (
	state: AuthState = initState,
	action: Action,
): AuthState => {
	switch (action.type) {
		case actionTypes.REGISTER_SUCCES:
			return {
				...state,
				isLogin: false,
				data: action.data || {},
			};
		case actionTypes.REGISTER_FAILED:
			return {
				...state,
				isLogin: false,
				data: {},
			};
		case actionTypes.LOGIN_SUCCESS:
			return {
				...state,
				isLogin: true,
				token: action.access_token || null,
				msg: 'Login successfully',
			};
		case actionTypes.LOGIN_FAIL:
			return {
				...state,
				isLogin: false,
				token: null,
				msg: 'Mật khẩu không chính xác',
			};
		case actionTypes.VERIFY_SUCCESS:
			return {
				...state,
				msgSuccess: 'Verify successfully',
				data: action.data || {},
			};
		case actionTypes.VERIFY_FAILED:
			return {
				...state,
				msgSuccess: 'Verify failed',
				data: {},
			};
		default:
			return state;
	}
};

export default authReducer;
