import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TableUser } from '@/schemas/user.schema';
import { fetchAllUsers } from '@/services/user';
import { RootState } from '@/stores/reducers/rootReducer';
import { filterUsers } from '@/utils/filters';

const ManageUser: React.FC = () => {
	const [users, setUsers] = useState<TableUser[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const { token } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (!token) {
			window.location.href = '/quan-tri-vien/dang-nhap';
		} else {
			setLoading(true);
			fetchAllUsers(token)
				.then((data) => {
					const tableData = data.map((user, index) => ({
						key: (index + 1).toString(),
						fullName: user.fullName,
						email: user.email,
						phoneNumber: user.phoneNumber,
						role: user.role,
					}));
					setUsers(tableData);
				})
				.catch(() => {
					setError('Không thể tải danh sách người dùng');
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [token]);

	const filteredUsers = filterUsers(users, searchText);

	const renderContent = () => {
		if (loading) {
			return (
				<div className="flex justify-center items-center">
					<div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
				</div>
			);
		}

		if (error) {
			return (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
					{error}
				</div>
			);
		}

		return (
			<table className="min-w-full border-collapse border border-gray-200">
				<thead>
					<tr>
						<th className="border border-gray-300 px-4 py-2 text-left">STT</th>
						<th className="border border-gray-300 px-4 py-2 text-left">
							Họ và tên
						</th>
						<th className="border border-gray-300 px-4 py-2 text-left">
							Email
						</th>
						<th className="border border-gray-300 px-4 py-2 text-left">
							Số điện thoại
						</th>
						<th className="border border-gray-300 px-4 py-2 text-left">
							Vai trò
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user, index) => (
						<tr
							key={user.key}
							className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
						>
							<td className="border border-gray-300 px-4 py-2">{user.key}</td>
							<td className="border border-gray-300 px-4 py-2">
								{user.fullName}
							</td>
							<td className="border border-gray-300 px-4 py-2">{user.email}</td>
							<td className="border border-gray-300 px-4 py-2">
								{user.phoneNumber}
							</td>
							<td className="border border-gray-300 px-4 py-2">{user.role}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className="p-5">
			<h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
			<div className="flex justify-between items-center mb-4">
				<input
					type="text"
					placeholder="Tìm kiếm người dùng"
					className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</div>
			{renderContent()}
		</div>
	);
};

export default ManageUser;
