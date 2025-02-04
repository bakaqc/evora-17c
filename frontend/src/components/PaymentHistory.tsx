import { Table } from 'antd';
import React from 'react';

const data = [
	{
		key: '1',
		eventName: 'Buổi hòa nhạc A',
		guests: 100,
		organizer: 'Công ty XYZ',
		date: '2025-02-01',
		amount: '100$',
		method: 'Thẻ tín dụng',
		status: 'Hoàn thành',
	},
	{
		key: '2',
		eventName: 'Hội thảo B',
		guests: 50,
		organizer: 'Tổ chức ABC',
		date: '2025-01-28',
		amount: '50$',
		method: 'PayPal',
		status: 'Đang chờ',
	},
	{
		key: '3',
		eventName: 'Hội nghị C',
		guests: 200,
		organizer: 'Công ty DEF',
		date: '2025-01-15',
		amount: '200$',
		method: 'Chuyển khoản ngân hàng',
		status: 'Hoàn thành',
	},
	{
		key: '4',
		eventName: 'Đám cưới D',
		guests: 200,
		organizer: 'Công ty DEF',
		date: '2025-01-15',
		amount: '200$',
		method: 'Chuyển khoản ngân hàng',
		status: 'Hoàn thành',
	},
	{
		key: '5',
		eventName: 'Tiệc khai trương F',
		guests: 200,
		organizer: 'Công ty DEF',
		date: '2025-01-15',
		amount: '200$',
		method: 'Chuyển khoản ngân hàng',
		status: 'Hoàn thành',
	},
	{
		key: '6',
		eventName: 'Hội nghị G',
		guests: 200,
		organizer: 'Công ty DEF',
		date: '2025-01-15',
		amount: '200$',
		method: 'Chuyển khoản ngân hàng',
		status: 'Hoàn thành',
	},
];

const columns = [
	{
		title: 'Tên sự kiện',
		dataIndex: 'eventName',
		key: 'eventName',
	},
	{
		title: 'Số lượng khách',
		dataIndex: 'guests',
		key: 'guests',
	},
	{
		title: 'Đơn vị tổ chức',
		dataIndex: 'organizer',
		key: 'organizer',
	},
	{
		title: 'Ngày',
		dataIndex: 'date',
		key: 'date',
	},
	{
		title: 'Số tiền',
		dataIndex: 'amount',
		key: 'amount',
	},
	{
		title: 'Phương thức thanh toán',
		dataIndex: 'method',
		key: 'method',
	},
	{
		title: 'Trạng thái',
		dataIndex: 'status',
		key: 'status',
	},
];

const PaymentHistory: React.FC = () => {
	return (
		<div className="w-full my-3">
			<h1 className="text-2xl mb-4">Lịch sử thanh toán</h1>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default PaymentHistory;
