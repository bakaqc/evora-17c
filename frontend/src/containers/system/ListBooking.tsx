/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import DashboardLayout from '@/components/DashBoardLayout';
import { getBookings } from '@/services/bookingService';
import { apiGetPartyById } from '@/services/party';
import { apiGetUser } from '@/services/user';
import { RootState } from '@/stores/reducers/rootReducer';

const STATUS_TRANSLATIONS: Record<string, string> = {
	PENDING: 'Đang chờ thanh toán',
	APPROVED: 'Đã duyệt',
	CANCELLED: 'Đã hủy',
};

const translateStatus = (status: string) =>
	STATUS_TRANSLATIONS[status] || status;

const determineProgress = (status: string, organizeDate: Date) => {
	if (status !== 'APPROVED') return '';

	const currentDate = new Date();
	const isSameDay = currentDate.toDateString() === organizeDate.toDateString();

	if (currentDate < organizeDate) return 'Đang chuẩn bị';
	if (isSameDay) return 'Đang diễn ra';
	return 'Đã kết thúc';
};

const ListBooking: React.FC = () => {
	const [bookings, setBookings] = useState<
		{
			key: string;
			bookingId: string;
			partyTitle: string;
			userName: string;
			guestCount: number;
			organizeAt: string;
			organizeDate: string;
			status: string;
			progress: string;
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
				const bookings = response.data || [];
				const tableData = await Promise.all(
					bookings.map(async (booking: any) => {
						const organizeDate = new Date(booking.organizeDate);
						const user = apiGetUser(booking.user);
						const responseUser = await user;
						const userName = responseUser.data.fullName;
						const party = apiGetPartyById(booking.party);
						const response = await party;
						const partyTitle = response.data.title;
						console.log('booking data', booking);
						return {
							key: booking._id,
							bookingId: booking._id,
							partyTitle: partyTitle,
							userName: userName,
							guestCount: booking.guestCount,
							organizeAt: booking.organizedAt,
							organizeDate: new Intl.DateTimeFormat('vi-VN', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
								second: '2-digit',
								timeZone: 'Asia/Ho_Chi_Minh',
							}).format(organizeDate),
							status: translateStatus(booking.status),
							progress: determineProgress(booking.status, organizeDate),
						};
					}),
				);
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
				<h1 className="text-2xl font-bold mb-4 text-center">
					Danh sách đặt tiệc
				</h1>

				<div className="overflow-x-auto">
					<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
						<thead>
							<tr className="bg-gray-200 text-gray-700">
								<th className="py-2 px-4 text-left w-[15%]">Tên bữa tiệc</th>
								<th className="py-2 px-4 text-left w-[10%]">Người đặt</th>
								<th className="py-2 px-4 text-left w-[10%]">Số bàn tiệc</th>
								<th className="py-2 px-4 text-left w-[15%]">
									Thời gian tổ chức
								</th>
								<th className="py-2 px-4 text-left w-[15%]">Địa điểm</th>
								<th className="py-2 px-4 text-left w-[10%]">Trạng thái</th>
								<th className="py-2 px-4 text-left w-[15%]">Tiến độ</th>
								<th className="py-2 px-4 text-left w-[10%]">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{bookings.map((booking) => (
								<tr key={booking.key}>
									<td className="border px-4 py-2">{booking.partyTitle}</td>
									<td className="border px-4 py-2">{booking.userName}</td>
									<td className="border px-4 py-2">{booking.guestCount}</td>
									<td className="border px-4 py-2">{booking.organizeDate}</td>
									<td className="border px-4 py-2">{booking.organizeAt}</td>
									<td
										className={`border px-4 py-2 ${getStatusColor(booking.status)}`}
									>
										{booking.status}
									</td>

									<td className="border px-4 py-2">{booking.progress}</td>
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
