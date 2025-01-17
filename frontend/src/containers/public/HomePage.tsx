import React from 'react';

import { List } from '@/components';
import { Pagination } from '@/containers/public';

const HomePage: React.FC = () => {
	return (
		<div className=" w-full flex flex-col gap-3">
			<div className="items-center justify-center text-center">
				<h1 className="font-serif mb-1.5 text-[25px] font-semibold text-[#E88F2A]">
					Danh sách sự kiện nổi bật
				</h1>
				<p className="text-[40px] font-bold mb-4 text-[#2B2825]">
					KHÁM PHÁ NGAY
				</p>
			</div>
			<div className="w-full flex gap-4">
				<div className="w-full">
					<List />
					<Pagination />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
