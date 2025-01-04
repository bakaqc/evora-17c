import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginAdmin } from '@/containers/public';
import { AdminPage } from '@/containers/system';
import { path } from '@/ultils/constant';

const AdminRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path={path.LOGIN_ADMIN} element={<LoginAdmin />} />
			<Route path={path.ADMINPAGE} element={<AdminPage />} />
		</Routes>
	);
};

export default AdminRoutes;
