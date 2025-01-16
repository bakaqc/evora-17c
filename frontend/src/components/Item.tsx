import React from 'react';
import { Link } from 'react-router-dom';

interface ItemProps {
	id: string;
	description: string;
	image: string;
	title: string;
	ratingCount: number;
	ratingTotal: number;
	category: string;
}

const Item: React.FC<ItemProps> = ({
	id,
	image,
	description,
	title,
	ratingTotal,
	ratingCount,
	category,
}) => {
	return (
		<div className="w-[275px] max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="relative w-full h-64">
				<img src={image} alt="Event" className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-black opacity-40"></div>
			</div>
			<div className="p-4">
				<div className="flex justify-between items-center mb-3">
					<h3 className="text-xl font-semibold text-gray-800">
						{title.trim().length > 15
							? `${title.trim().slice(0, 15)}...`
							: title}
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
						<span className="ml-1">{ratingTotal / ratingCount}</span>
					</div>
				</div>
				<p className="text-gray-600 text-sm mb-4">{description}</p>
				<div className="flex space-x-4 text-sm">
					<div className="flex items-center">
						<span className="text-gray-900">🎉</span>
						<span className="ml-1 text-gray-800">{category}</span>
					</div>
				</div>
			</div>
			<div className="px-4 py-3">
				<Link to={`/chi-tiet-su-kien/${id}`}>
					<button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
						Xem ngay
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Item;
