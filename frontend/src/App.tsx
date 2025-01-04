import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
	Home,
	HomePage,
	LoginAdmin,
	LoginUser,
	RegisterUser,
	VerifyOTP,
} from '@/containers/public';
import { AdminPage } from '@/containers/system';
import { RootState } from '@/stores/reducers/rootReducer';
import { path } from '@/ultils/constant';

const App: React.FC = () => {
	const { isLogin } = useSelector((state: RootState) => state.auth);
	useEffect(() => {
		console.log(isLogin);
	}, [isLogin]);
	return (
		<div className="overflow-hidden">
			<Routes>
        //Route for User
				<Route path={path.HOME} element={<Home />}>
					<Route path="*" element={<HomePage />} />
				</Route>
				<Route path={path.LOGIN_USER} element={<LoginUser />} />
				<Route path={path.LOGIN_ADMIN} element={<LoginAdmin />} />
				<Route path={path.REGISTER_USER} element={<RegisterUser />} />
				<Route path={path.VERIFY_OTP} element={<VerifyOTP />} />
        
        //Route for User
        <Route path={path.ADMINPAGE} element={<AdminPage />} />
			</Routes>

			<ToastContainer position="top-center" />
		</div>
	);
};

export default App;
