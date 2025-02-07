import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import DashboardLayout from '@/components/DashBoardLayout';
import { User } from '@/schemas/user.schema';
import { getUsers } from '@/services/userService';
import { RootState } from '@/stores/reducers/rootReducer';

interface UserType {
	key: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	address: string;
	dateOfBirth: string;
	gender: string;
}

const ManageUser: React.FC = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const { token } = useSelector((state: RootState) => state.auth);

	const fetchUsers = async () => {
		setLoading(true);
		setError(null); // Reset error state
		if (!token) {
			setError('Token is missing');
			setLoading(false);
			return;
		}
		try {
			const response = await getUsers(token);
			console.log('API Response manage:', response);
			if (response.success) {
				const usersData = response.data || [];
				const tableData = usersData.map((user: User) => ({
					key: user._id,
					fullName: user.fullName,
					email: user.email,
					phoneNumber: user.phoneNumber,
					address: user.address,
					dateOfBirth: new Date(user.dateOfBirth).toLocaleDateString(),
					gender: user.gender,
				}));
				setUsers(tableData);
			} else {
				setError(response.message);
			}
		} catch (error) {
			console.error('Fetch Users Error:', error);
			setError('Failed to fetch users');
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<DashboardLayout>
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-4">Manage Users</h1>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
						<thead>
							<tr className="bg-gray-200 text-gray-700">
								<th className="py-2 px-4 text-left">Full Name</th>
								<th className="py-2 px-4 text-left">Email</th>
								<th className="py-2 px-4 text-left">Phone Number</th>
								<th className="py-2 px-4 text-left">Address</th>
								<th className="py-2 px-4 text-left">Date of Birth</th>
								<th className="py-2 px-4 text-left">Gender</th>
								<th className="py-2 px-4 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.key}>
									<td className="border px-4 py-2">{user.fullName}</td>
									<td className="border px-4 py-2">{user.email}</td>
									<td className="border px-4 py-2">{user.phoneNumber}</td>
									<td className="border px-4 py-2">{user.address}</td>
									<td className="border px-4 py-2">{user.dateOfBirth}</td>
									<td className="border px-4 py-2">{user.gender}</td>
									<td className="border px-4 py-2 flex space-x-2">
										<button className="bg-blue-500 text-white px-3 py-1 rounded">
											Edit
										</button>
										<button className="bg-red-500 text-white px-3 py-1 rounded">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default ManageUser;
