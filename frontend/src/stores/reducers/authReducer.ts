type AuthState = {
	isLogin: boolean;
	token: string | null;
	msg: string;
	update: boolean;
	msgSuccess: string;
};

type Action = {
	type: string;
	data?: string;
};

const initState: AuthState = {
	isLogin: false,
	token: null,
	msg: '',
	update: false,
	msgSuccess: '',
};

const authReducer = (
	state: AuthState = initState,
	action: Action,
): AuthState => {
	switch (action.type) {
		default:
			return state;
	}
};

export default authReducer;
