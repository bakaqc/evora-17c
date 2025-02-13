import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '@/components/DashBoardLayout';
import { Party } from '@/schemas/party.schema';
import { getParties } from '@/services/partyService';
import { RootState } from '@/stores/reducers/rootReducer';

const ListParty: React.FC = () => {
	const navigate = useNavigate();
	const [parties, setParties] = useState<
		{
			key: string;
			title: string;
			category: string;
			description: string;
			rating: string;
			createdAt: string;
		}[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const { token } = useSelector((state: RootState) => state.auth);
	const fetchParties = async () => {
		setLoading(true);
		setError(null);
		if (!token) {
			setError('Token is missing');
			setLoading(false);
			return;
		}
		try {
			const response = await getParties(token);
			console.log('API Response manage:', response.data);
			if (response.success) {
				const partiesData = response.data || [];
				const tableData = partiesData.map((party: Party) => ({
					key: party._id,
					title: party.title,
					category: party.category,
					description: party.description,
					rating: `${party.ratingTotal} / ${party.ratingCount}`,
					createdAt: party.createdAt
						? new Date(party.createdAt).toLocaleDateString()
						: 'N/A',
				}));
				setParties(tableData);
			} else {
				setError(response.message);
			}
		} catch (error) {
			console.error('Fetch parties Error:', error);
			setError('Failed to fetch parties');
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchParties();
	}, []);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	const getCategoryTagClass = (category: string) => {
		switch (category) {
			case 'Sinh nhật':
				return 'bg-blue-200 text-blue-800';
			case 'Đám cưới':
				return 'bg-pink-200 text-pink-800';
			case 'Khai trương':
				return 'bg-green-200 text-green-800';
			case 'Thôi nôi':
				return 'bg-yellow-200 text-yellow-800';
			default:
				return 'bg-gray-200 text-gray-800';
		}
	};
	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold mb-4 m-auto text-center">
						Danh sách bữa tiệc
					</h1>
					<button
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 m-4 rounded-lg shadow-md transition duration-300"
						onClick={() => navigate('/quan-tri-vien/them-bua-tiec')}
					>
						Tạo bữa tiệc
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
						<thead>
							<tr className="bg-gray-200 text-gray-700">
								<th className="py-2 px-4 text-left w-[30%]">Tên</th>
								<th className="py-2 px-4 text-left w-[10%]">Phân loại</th>
								<th className="py-2 px-4 text-left w-[40%]">Mô tả</th>
								<th className="py-2 px-4 text-left w-[10%]">Ngày tạo</th>
								<th className="py-2 px-4 text-left w-[10%]">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{parties.map((party) => (
								<tr key={party.key}>
									<td className="border px-4 py-2">{party.title}</td>
									<td
										className={`border px-4 py-2 ${getCategoryTagClass(party.category)}`}
									>
										{party.category}
									</td>
									<td className="border px-4 py-2">
										<div
											className="line-clamp-3 hover:line-clamp-none"
											dangerouslySetInnerHTML={{ __html: party.description }}
										></div>
									</td>
									<td className="border px-4 py-2">{party.createdAt}</td>
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

export default ListParty;
