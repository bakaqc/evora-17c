import React, { useState } from 'react';

interface Option {
	type: string;
	price: number;
}
interface FormData {
	user: string;
	category: string;
	title: string;
	description: string;
	options: Option[];
	photos: string[];
	ratingTotal: number;
	ratingCount: number;
}
const PartyForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		user: '',
		category: 'Sinh nhật',
		title: '',
		description: '',
		options: [
			{ type: 'Basic', price: 0 },
			{ type: 'Premium', price: 0 },
			{ type: 'VIP', price: 0 },
		],
		photos: [''],
		ratingTotal: 0,
		ratingCount: 0,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleOptionChange = (
		index: number,
		key: keyof Option,
		value: string,
	) => {
		setFormData((prev) => {
			const updatedOptions = [...prev.options];
			updatedOptions[index] = {
				...updatedOptions[index],
				[key]: key === 'price' ? Number(value) : value,
			};
			return { ...prev, options: updatedOptions };
		});
	};

	const handlePhotoChange = (index: number, value: string) => {
		setFormData((prev) => {
			const updatedPhotos = [...prev.photos];
			updatedPhotos[index] = value;
			return { ...prev, photos: updatedPhotos };
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form Data:', formData);
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-6">Tạo sự kiện</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="user" className="block font-medium mb-1">
						User:
					</label>
					<input
						id="user"
						name="user"
						value={formData.user}
						onChange={handleChange}
						placeholder="Enter your name"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label htmlFor="category" className="block font-medium mb-1">
						Category:
					</label>
					<input
						id="category"
						name="category"
						value={formData.category}
						onChange={handleChange}
						placeholder="Enter category"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label htmlFor="title" className="block font-medium mb-1">
						Title:
					</label>
					<input
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Enter title"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label htmlFor="description" className="block font-medium mb-1">
						Description:
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Enter description"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label className="block font-medium mb-2">Options:</label>
					{formData.options.map((option, index) => (
						<div key={index} className="flex gap-2 mb-2">
							<input
								id={`option-type-${index}`}
								value={option.type}
								onChange={(e) =>
									handleOptionChange(index, 'type', e.target.value)
								}
								placeholder="Type"
								className="w-1/2 p-2 border rounded-md focus:ring focus:ring-blue-300"
							/>
							<input
								id={`option-price-${index}`}
								type="number"
								value={option.price}
								onChange={(e) =>
									handleOptionChange(index, 'price', e.target.value)
								}
								placeholder="Price"
								className="w-1/2 p-2 border rounded-md focus:ring focus:ring-blue-300"
							/>
						</div>
					))}
				</div>
				<div>
					<label className="block font-medium mb-2">Photos:</label>
					{formData.photos.map((photo, index) => (
						<input
							id={`photo-${index}`}
							key={index}
							value={photo}
							onChange={(e) => handlePhotoChange(index, e.target.value)}
							placeholder="Photo URL"
							className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 mb-2"
						/>
					))}
				</div>
				<div className="flex gap-4">
					<div className="w-1/2">
						<label htmlFor="ratingTotal" className="block font-medium mb-1">
							Rating Total:
						</label>
						<input
							id="ratingTotal"
							name="ratingTotal"
							type="number"
							value={formData.ratingTotal}
							onChange={handleChange}
							placeholder="Rating Total"
							className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
						/>
					</div>
					<div className="w-1/2">
						<label htmlFor="ratingCount" className="block font-medium mb-1">
							Rating Count:
						</label>
						<input
							id="ratingCount"
							name="ratingCount"
							type="number"
							value={formData.ratingCount}
							onChange={handleChange}
							placeholder="Rating Count"
							className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white font-semibold p-2 rounded-md hover:bg-blue-700 transition"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default PartyForm;
