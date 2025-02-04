import { actionTypes } from '@/stores/actions/actionTypes';

export interface User {
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
}

interface Action {
	type: string;
	user?: User;
	msg?: string;
}

interface UserState {
	user: User;
}

// ✅ Cung cấp giá trị mặc định rõ ràng cho user
const initUser: User = {
	_id: '',
	fullName: '',
	email: '',
	phoneNumber: '',
	address: '',
	dateOfBirth: '',
	gender: '',
	role: '',
	verificationCode: null,
	verificationCodeExpires: null,
	isVerified: false,
	avatar: '',
	createdAt: '',
	updatedAt: '',
};

const initState: UserState = {
	user: initUser,
};

const userReducer = (
	state: UserState = initState,
	action: Action,
): UserState => {
	switch (action.type) {
		case actionTypes.GET_USER:
			return {
				...state,
				user: action.user ?? state.user, // ✅ Nếu action.user là undefined, giữ nguyên state.user
			};
		default:
			return state;
	}
};

export default userReducer;
