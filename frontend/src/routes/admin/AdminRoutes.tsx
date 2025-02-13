import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
	AdminPage,
	CreateParty,
	LoginAdmin,
	ManageUser,
} from '@/containers/system';
import ListBooking from '@/containers/system/ListBooking';
import ListParty from '@/containers/system/ListParty';
import { path } from '@/utils/constant';

const AdminRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path={path.LOGIN_ADMIN} element={<LoginAdmin />} />
			<Route path={path.ADMINPAGE} element={<AdminPage />} />
			<Route path={path.LISTUSER} element={<ManageUser />} />
			<Route path={path.LISTPARTIES} element={<ListParty />} />
			<Route path={path.LISTBOOKING} element={<ListBooking />} />
			<Route path={path.CREATEPARTY} element={<CreateParty />} />
		</Routes>
	);
};

export default AdminRoutes;
