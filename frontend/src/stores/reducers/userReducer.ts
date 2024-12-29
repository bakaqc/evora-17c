type UserState = {
	currentData: Record<string, any>;
};

type Action = {
	type: string;
	currentData?: Record<string, any>;
};

const initState: UserState = {
	currentData: {},
};

const userReducer = (
	state: UserState = initState,
	action: Action,
): UserState => {
	switch (action.type) {
		default:
			return state;
	}
};

export default userReducer;
