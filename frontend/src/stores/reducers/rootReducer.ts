import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import authReducer from '@/stores/reducers/authReducer';
import partyReducer from '@/stores/reducers/partyReducer';
import userReducer from '@/stores/reducers/userReducer';
import { Payload } from '@/utils/type';

type AuthState = {
	isLogin: boolean;
	isLoginAdmin: boolean;
	token: string | null;
	msg: string;
	update: boolean;
	msgSuccess: string;
	data: Payload;
};
const commonConfig = {
	storage,
	stateReconciler: autoMergeLevel2,
};

const authConfig = {
	...commonConfig,
	key: 'auth',
	whitelist: ['isLoggedIn', 'token'],
};

const rootReducer = combineReducers({
	auth: persistReducer<AuthState>(authConfig, authReducer),
	user: userReducer,
	party: partyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
