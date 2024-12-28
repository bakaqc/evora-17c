import React from 'react';

const Item: React.FC = () => {
	return (
		<div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="relative w-full h-64">
				<img
					src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
					alt="House"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black opacity-40"></div>
			</div>
			<div className="p-4">
				<div className="flex justify-between items-center mb-3">
					<h3 className="text-xl font-semibold text-gray-800">
						Wooden House, Florida
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
						<span className="ml-1">5.0</span>
					</div>
				</div>
				<p className="text-gray-600 text-sm mb-4">
					Enter a freshly updated and thoughtfully furnished peaceful home
					surrounded by ancient trees, stone walls, and open meadows.
				</p>
				<div className="flex space-x-4 text-sm">
					<div className="flex items-center">
						<span className="text-gray-900">💲</span>
						<span className="ml-1 text-gray-800">$129 per night</span>
					</div>
					<div className="flex items-center">
						<span className="text-gray-900">📶</span>
						<span className="ml-1 text-gray-800">Free wifi</span>
					</div>
				</div>
			</div>
			<div className="px-4 py-3">
				<button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
					Reserve
				</button>
			</div>
		</div>
	);
};

export default Item;
