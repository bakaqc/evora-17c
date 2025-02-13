import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import moreDark from '@/assets/moreDark.png';

// Dữ liệu ví dụ
const data = [
	{
		name: 'Jan',
		khach_hang: 4000,
		don_vi_to_chuc: 2400,
	},
	{
		name: 'Feb',
		khach_hang: 3000,
		don_vi_to_chuc: 1398,
	},
	{
		name: 'Mar',
		khach_hang: 2000,
		don_vi_to_chuc: 9800,
	},
	{
		name: 'Apr',
		khach_hang: 2780,
		don_vi_to_chuc: 3908,
	},
	{
		name: 'May',
		khach_hang: 1890,
		don_vi_to_chuc: 4800,
	},
	{
		name: 'Jun',
		khach_hang: 2390,
		don_vi_to_chuc: 3800,
	},
	{
		name: 'Jul',
		khach_hang: 3490,
		don_vi_to_chuc: 4300,
	},
	{
		name: 'Aug',
		khach_hang: 3490,
		don_vi_to_chuc: 4300,
	},
	{
		name: 'Sep',
		khach_hang: 3490,
		don_vi_to_chuc: 4300,
	},
	{
		name: 'Oct',
		khach_hang: 3490,
		don_vi_to_chuc: 4300,
	},
	{
		name: 'Nov',
		khach_hang: 3490,
		don_vi_to_chuc: 4300,
	},
	{
		name: 'Dec',
		khach_hang: 3490,
		don_vi_to_chuc: 4300,
	},
];

const FinanceChart = () => {
	return (
		<div className="bg-white rounded-xl w-full h-full p-4">
			<div className="flex justify-between items-center">
				<h1 className="text-lg font-semibold">Doanh thu</h1>
				<img src={moreDark} alt="More" width={20} height={20} />
			</div>
			<ResponsiveContainer width="100%" height="90%">
				<LineChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
					<XAxis
						dataKey="name"
						axisLine={false}
						tick={{ fill: '#d1d5db' }}
						tickLine={false}
						tickMargin={10}
					/>
					<YAxis
						axisLine={false}
						tick={{ fill: '#d1d5db' }}
						tickLine={false}
						tickMargin={20}
					/>
					<Tooltip />
					<Legend
						align="center"
						verticalAlign="top"
						wrapperStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
					/>
					<Line
						type="monotone"
						dataKey="khach_hang"
						stroke="#3361bd"
						strokeWidth={5}
					/>
					<Line
						type="monotone"
						dataKey="don_vi_to_chuc"
						stroke="#f5ca48"
						strokeWidth={5}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default FinanceChart;
