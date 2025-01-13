import React from 'react';

import { Slider } from '@/components';
import icons from '@/utils/icons';

const { FaLocationDot, PiMoneyWavyLight } = icons;
const DetailPost: React.FC = () => {
	return (
		<div className="w-full flex gap-4">
			<div className="w-[70%] bg-white rounded-md shadow-md p-4">
				<Slider images={[]} />
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-bold text-orange-600">title</h2>
					<div className="flex items-center gap-2">
						<span>Chuyên mục: </span>
						<span className="text-blue-500 underline font-medium hover:text-orange-500 cursor-pointer">
							label
						</span>
					</div>
					<div className="flex gap-2 items-center">
						<FaLocationDot color="blue" />
						<span>address</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="flex items-center gap-1">
							<PiMoneyWavyLight />
							<span className="font-semibold text-lg text-green-600">
								price
							</span>
						</span>
					</div>
				</div>
				<div className="mt-8">
					<h3 className="font-semibold text-xl my-4">Thông tin mô tả</h3>
					<div className="flex flex-col gap-3">
						<span className="text-justify">description</span>
					</div>
				</div>
				<div className="mt-8 w-full">
					<h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
					<table className="w-full">
						<tbody>
							<tr>
								<td className="p-4">Mã tin</td>
								<td className="p-4">id</td>
							</tr>
							{/* Các hàng khác nếu cần */}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default DetailPost;
