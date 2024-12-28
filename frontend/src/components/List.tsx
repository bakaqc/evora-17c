import React from 'react';

import { Item } from '@/components';

interface ListProps {
	categoriesCode?: string;
}

const List: React.FC<ListProps> = () => {
	return (
		<div className="w-full p-2 bg-[#FAF3EB] shadow-md rounded-md px-6">
			<div className="flex items-center justify-between my-3">
				<h4 className="text-md font-semibold">Danh sách tin đăng</h4>
				<span>Cập nhật: 12:05 24/12/2024</span>
			</div>
			<div className="flex items-center gap-2 my-2"></div>
			<div className="flex gap-4 overflow-x-auto">
				<Item />
				<Item />
				<Item />
				<Item />
			</div>
		</div>
	);
};

export default List;
