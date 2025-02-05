/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { apiGetBookingByUserId } from '@/services/booking';
import { apiGetPartyById } from '@/services/party';
import { RootState } from '@/stores/reducers/rootReducer';

const columns = [
	{
		title: 'Sự kiện',
		dataIndex: 'eventName',
		key: 'eventName',
	},
	{
		title: 'Số lượng khách',
		dataIndex: 'guestCount',
		key: 'guestCount',
	},
	{
		title: 'Địa điểm tổ chức',
		dataIndex: 'organizedAt',
		key: 'organizedAt',
	},
	{
		title: 'Thời gian tổ chức',
		dataIndex: 'organizeDate',
		key: 'organizeDate',
	},
	{
		title: 'Trạng thái',
		dataIndex: 'status',
		key: 'status',
	},
	{
		title: 'Tiến độ',
		dataIndex: 'progress',
		key: 'progress',
	},
];

const translateStatus = (status: string) => {
	switch (status) {
		case 'PENDING':
			return 'Đang chờ thanh toán';
		case 'APPROVED':
			return 'Đã duyệt';
		case 'CANCELLED':
			return 'Đã hủy';
		default:
			return status;
	}
};

const determineProgress = (status: string, organizeDate: Date) => {
	if (status === 'APPROVED') {
		const currentDate = new Date();
		if (currentDate < organizeDate) {
			return 'Đang chuẩn bị';
		} else if (currentDate.toDateString() === organizeDate.toDateString()) {
			return 'Đang diễn ra';
		} else {
			return 'Đã kết thúc';
		}
	}
	return '';
};

const PaymentHistory: React.FC = () => {
	const [data, setData] = useState([]);
	const { token } = useSelector((state: RootState) => state.auth);
	const { user } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (token) {
					const bookingsResponse = await apiGetBookingByUserId(user._id, token);
					const bookings = bookingsResponse.data;

					const tableData = bookings.map((booking: any, index: number) => {
						const organizeDate = new Date(booking.organizeDate);
						const party = apiGetPartyById(booking.party);
						const partyPromise = party.then((response) => response.data.title);
						console.log(partyPromise);
						return {
							key: index,
							eventName: partyPromise,
							guestCount: booking.guestCount,
							organizedAt: booking.organizedAt,
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
					});

					setData(tableData);
				} else {
					console.error('Token is null');
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [user._id, token]);

	return (
		<div className="w-full my-3">
			<h1 className="text-2xl mb-4">Lịch sử đặt tiệc</h1>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default PaymentHistory;
