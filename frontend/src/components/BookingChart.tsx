import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import moreDark from '@/assets/moreDark.png';

const data = [
	{
		name: 'Mon',
		processing: 60,
		cancel: 40,
	},
	{
		name: 'Tue',
		processing: 70,
		cancel: 60,
	},
	{
		name: 'Wed',
		processing: 90,
		cancel: 75,
	},
	{
		name: 'Thu',
		processing: 90,
		cancel: 75,
	},
	{
		name: 'Fri',
		processing: 65,
		cancel: 55,
	},
];

const BookingChart = () => {
	return (
		<div className="bg-white rounded-lg p-4 h-full">
			<div className="flex justify-between items-center">
				<h1 className="text-lg font-semibold">Thống kê đặt hàng</h1>
				<img src={moreDark} alt="More Options" width={20} height={20} />
			</div>
			<ResponsiveContainer width="100%" height="90%">
				<BarChart width={500} height={300} data={data} barSize={20}>
					<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
					<XAxis
						dataKey="name"
						axisLine={false}
						tick={{ fill: '#d1d5db' }}
						tickLine={false}
					/>
					<YAxis axisLine={false} tick={{ fill: '#d1d5db' }} tickLine={false} />
					<Tooltip
						contentStyle={{ borderRadius: '10px', borderColor: 'lightgray' }}
					/>
					<Legend
						align="left"
						verticalAlign="top"
						wrapperStyle={{ paddingTop: '20px', paddingBottom: '40px' }}
					/>
					<Bar
						dataKey="processing"
						fill="#FAE27C"
						legendType="circle"
						radius={[10, 10, 0, 0]}
					/>
					<Bar
						dataKey="cancel"
						fill="#C3EBFA"
						legendType="circle"
						radius={[10, 10, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default BookingChart;
