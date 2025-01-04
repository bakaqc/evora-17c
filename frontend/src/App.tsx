import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import AdminRoutes from '@/routes/admin/AdminRoutes';
import UserRoutes from '@/routes/user/UserRoutes';
import { RootState } from '@/stores/reducers/rootReducer';

const App: React.FC = () => {
	const { isLogin } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		console.log(isLogin);
	}, [isLogin]);

	return (
		<div className="overflow-hidden">
			{/* User and Admin Routes */}
			<UserRoutes />
			<AdminRoutes />

			{/* Toast Notification */}
			<ToastContainer position="top-center" />
		</div>
	);
};

export default App;
