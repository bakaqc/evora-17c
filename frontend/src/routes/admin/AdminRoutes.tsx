import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AdminPage, LoginAdmin, ManageUser } from '@/containers/system';
import { path } from '@/utils/constant';

const AdminRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path={path.LOGIN_ADMIN} element={<LoginAdmin />} />
			<Route path={path.ADMINPAGE} element={<AdminPage />} />
			<Route path={path.LISTUSER} element={<ManageUser />} />
		</Routes>
	);
};

export default AdminRoutes;
