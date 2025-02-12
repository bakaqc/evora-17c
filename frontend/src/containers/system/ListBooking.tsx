import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import DashboardLayout from '@/components/DashBoardLayout';
import { Booking } from '@/schemas/booking.schema';
import { getBookings } from '@/services/bookingService';
import { RootState } from '@/stores/reducers/rootReducer';

const ListBooking: React.FC = () => {
	const [bookings, setBookings] = useState<
		{
			key: string;
			bookingId: string;
			partyTitle: string;
			userName: string;
			guestCount: number;
			status: string;
			paymentStatus: string;
			organizeDate: string;
			createdAt: string;
		}[]
	>([]);

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'APPROVED':
				return 'text-green-600';
			case 'CANCELLED':
				return 'text-red-600';
			default:
				return 'text-yellow-600';
		}
	};
	const { token } = useSelector((state: RootState) => state.auth);

	const fetchBookings = async () => {
		setLoading(true);
		setError(null);
		if (!token) {
			setError('Token is missing');
			setLoading(false);
			return;
		}
		try {
			const response = await getBookings(token);
			console.log('API Response bookings:', response.data);
			if (response.success) {
				const bookingsData = response.data || [];
				const tableData = bookingsData.map((booking: Booking) => ({
					key: booking._id,
					bookingId: booking._id,
					partyTitle: booking.party.title,
					userName: booking.user.fullName || 'Unknown',
					guestCount: booking.guestCount,
					status: booking.status,
					paymentStatus: booking.payment ? 'Đã thanh toán' : 'Chưa thanh toán',
					organizeDate: booking.organizeDate
						? new Date(booking.organizeDate).toLocaleDateString()
						: 'N/A',
					createdAt: booking.createdAt
						? new Date(booking.createdAt).toLocaleDateString()
						: 'N/A',
				}));
				setBookings(tableData);
			} else {
				setError(response.message);
			}
		} catch (error) {
			console.error('Fetch bookings Error:', error);
			setError('Failed to fetch bookings');
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchBookings();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<DashboardLayout>
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-4">List Bookings</h1>

				<div className="overflow-x-auto">
					<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
						<thead>
							<tr className="bg-gray-200 text-gray-700">
								<th className="py-2 px-4 text-left">Booking ID</th>
								<th className="py-2 px-4 text-left">Party Title</th>
								<th className="py-2 px-4 text-left">User</th>
								<th className="py-2 px-4 text-left">Guest Count</th>
								<th className="py-2 px-4 text-left">Status</th>
								<th className="py-2 px-4 text-left">Payment</th>
								<th className="py-2 px-4 text-left">Organize Date</th>
								<th className="py-2 px-4 text-left">Created At</th>
								<th className="py-2 px-4 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{bookings.map((booking) => (
								<tr key={booking.key}>
									<td className="border px-4 py-2">{booking.bookingId}</td>
									<td className="border px-4 py-2">{booking.partyTitle}</td>
									<td className="border px-4 py-2">{booking.userName}</td>
									<td className="border px-4 py-2">{booking.guestCount}</td>
									<td
										className={`border px-4 py-2 ${getStatusColor(booking.status)}`}
									>
										{booking.status}
									</td>
									<td className="border px-4 py-2">{booking.paymentStatus}</td>
									<td className="border px-4 py-2">{booking.organizeDate}</td>
									<td className="border px-4 py-2">{booking.createdAt}</td>
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

export default ListBooking;
