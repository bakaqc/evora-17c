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
	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold mb-4">List Parties</h1>
					<button
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
						onClick={() => navigate('/quan-tri-vien/them-bua-tiec')}
					>
						Create Party
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
						<thead>
							<tr className="bg-gray-200 text-gray-700">
								<th className="py-2 px-4 text-left">Title</th>
								<th className="py-2 px-4 text-left">Category</th>
								<th className="py-2 px-4 text-left">Description</th>
								<th className="py-2 px-4 text-left">Created At</th>
								<th className="py-2 px-4 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{parties.map((party) => (
								<tr key={party.key}>
									<td className="border px-4 py-2">{party.title}</td>
									<td className="border px-4 py-2">{party.category}</td>
									<td className="border px-4 py-2">{party.description}</td>
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
