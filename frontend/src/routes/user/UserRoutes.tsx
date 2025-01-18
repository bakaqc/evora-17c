// src/routes/user/UserRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
	Home,
	HomePage,
	LoginUser,
	RegisterUser,
	VerifyOTP,
} from '@/containers/public';
import AboutPage from '@/containers/public/AboutPage';
import PartyDetailPage from '@/containers/public/PartyDetailPage';
import { path } from '@/utils/constant';

const UserRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path={path.HOME} element={<Home />}>
				<Route path="*" element={<HomePage />} />
			</Route>
			<Route path={path.LOGIN_USER} element={<LoginUser />} />
			<Route path={path.REGISTER_USER} element={<RegisterUser />} />
			<Route path={path.VERIFY_OTP} element={<VerifyOTP />} />
			<Route path={path.PARTY_DETAIL} element={<PartyDetailPage />} />
			<Route path={path.INTRO} element={<AboutPage />} />
		</Routes>
	);
};

export default UserRoutes;
