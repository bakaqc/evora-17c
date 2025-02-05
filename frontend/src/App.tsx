import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminRoutes from '@/routes/admin/AdminRoutes';
import UserRoutes from '@/routes/user/UserRoutes';

const App: React.FC = () => {
	return (
		<div className="overflow-hidden">
			<Routes>
				<Route path="/*" element={<UserRoutes />} />
				<Route path="/quan-tri-vien/*" element={<AdminRoutes />} />
			</Routes>
			<ToastContainer position="top-center" />
		</div>
	);
};

export default App;
