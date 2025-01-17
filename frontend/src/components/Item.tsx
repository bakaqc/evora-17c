import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Option } from '@/schemas/party.schema';
import { User } from '@/schemas/user.schema';
import { apiGetUser } from '@/services/user';

interface ItemProps {
	id: string;
	user: string;
	options: Option[];
	image: string;
	title: string;
	ratingCount: number;
	ratingTotal: number;
	category: string;
}

const Item: React.FC<ItemProps> = ({
	id,
	user,
	options,
	image,
	title,
	ratingTotal,
	ratingCount,
	category,
}) => {
	const [owner, setOwner] = React.useState<User | null>(null);
	const basicOption = options.find((option) => option.type === 'Basic');

	useEffect(() => {
		const fetchOwner = async () => {
			if (user) {
				try {
					const ownerResponse = await apiGetUser(user);
					setOwner(ownerResponse.data);
				} catch (error) {
					console.error('Error fetching user details:', error);
				}
			}
		};
		fetchOwner();
	}, [user]);

	// Function to determine the tag color based on the category
	const getCategoryTagClass = (category: string) => {
		switch (category) {
			case 'Sinh nhật':
				return 'bg-blue-200 text-blue-800';
			case 'Đám cưới':
				return 'bg-pink-200 text-pink-800';
			case 'Khai trương':
				return 'bg-green-200 text-green-800';
			case 'Thôi nôi':
				return 'bg-yellow-200 text-yellow-800';
			default:
				return 'bg-gray-200 text-gray-800';
		}
	};

	return (
		<div className="w-[275px] max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
			<div className="relative w-full h-64">
				<img src={image} alt="Event" className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-black opacity-40"></div>
			</div>
			<div className="p-4">
				<div className="flex justify-between items-center mb-3">
					<h3 className="text-base font-semibold text-gray-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
						{title.trim().length > 15 ? `${title.trim()}` : title}
					</h3>
					<div className="flex items-center text-yellow-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-5 w-5"
						>
							<path
								fillRule="evenodd"
								d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="ml-1">
							{ratingCount > 0 ? (ratingTotal / ratingCount).toFixed(1) : 'N/A'}
						</span>
					</div>
				</div>
				{/* Pricing */}
				{basicOption && (
					<p className="text-base text-gray-800 font-medium mb-2">
						Giá chỉ từ:{' '}
						<span className="text-red-600">
							{new Intl.NumberFormat('vi-VN', {
								style: 'currency',
								currency: 'VND',
							}).format(basicOption.price)}{' '}
							/ người
						</span>
					</p>
				)}
				{/* Owner Info */}
				<p className="text-base text-gray-600">
					Đơn vị tổ chức:{' '}
					<span className="font-semibold text-gray-800">
						{owner ? owner.fullName : 'Đang cập nhật...'}
					</span>
				</p>
				<div className="flex space-x-4 text-sm mt-3">
					{/* Category as Tag */}
					<div
						className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${getCategoryTagClass(
							category,
						)}`}
					>
						{category}
					</div>
				</div>
			</div>
			<div className="px-4 py-3">
				<Link to={`/chi-tiet-su-kien/${id}`}>
					<button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
						Xem ngay
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Item;
