import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
	Home,
	HomePage,
	LoginAdmin,
	LoginUser,
	RegisterUser,
	VerifyOTP,
} from '@/containers/public';
import { path } from '@/ultils/constant';

const App: React.FC = () => {
	return (
		<div className="overflow-hidden">
			<Routes>
				<Route path={path.HOME} element={<Home />}>
					<Route path="*" element={<HomePage />} />
				</Route>
				<Route path={path.LOGIN_USER} element={<LoginUser />} />
				<Route path={path.LOGIN_ADMIN} element={<LoginAdmin />} />
				<Route path={path.REGISTER_USER} element={<RegisterUser />} />
				<Route path={path.VERIFY_OTP} element={<VerifyOTP />} />
			</Routes>
		</div>
	);
};

export default App;
