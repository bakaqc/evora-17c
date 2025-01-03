import BookingChart from '@/components/BookingChart';
import CountChart from '@/components/CountChart';
import DashboardLayout from '@/components/DashBoardLayout';
import FinanceChart from '@/components/FinanceChart';
import Notify from '@/components/Notify';

const AdminPage = () => {
	return (
		<DashboardLayout>
			<div className="p-4 flex gap-4 flex-col md:flex-row">
				{/* BÊN TRÁI */}
				<div className="w-full lg:w-2/3 flex flex-col gap-8">
					{/* BIỂU ĐỒ Ở GIỮA */}
					<div className="flex gap-4 flex-col lg:flex-row">
						{/* BIỂU ĐỒ ĐẾM */}
						<div className="w-full lg:w-1/3 h-[450px]">
							<CountChart />
						</div>
						{/* BIỂU ĐỒ ĐIỂM DANH */}
						<div className="w-full lg:w-2/3 h-[450px]">
							<BookingChart />
						</div>
					</div>
					{/* BIỂU ĐỒ TÀI CHÍNH */}
					<div className="w-full h-[500px]">
						<FinanceChart />
					</div>
				</div>
				{/* BÊN PHẢI */}
				<div className="w-full lg:w-1/3 flex flex-col gap-8">
					<Notify />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default AdminPage;
