// Dùng react-router-dom cho điều hướng
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import logo1 from '@/assets/logo1.png';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';

interface DashboardLayoutProps {
	children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<div className="h-screen flex">
			{/* LEFT */}
			<div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
				<Link
					to="/"
					className="flex items-center justify-center lg:justify-start gap-2"
				>
					<img src={logo1} alt="logo" width={32} height={32} />
					<span className="hidden lg:block font-bold">Evora</span>
				</Link>
				<Menu />
			</div>
			{/* RIGHT */}
			<div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
				<Navbar />
				{children}
			</div>
		</div>
	);
};

export default DashboardLayout;
