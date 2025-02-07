import React, { useState } from 'react';

interface Option {
	id: string;
	type: string;
	price: number;
}

interface Photo {
	id: string;
	url: string;
}

interface FormData {
	user: string;
	category: string;
	title: string;
	description: string;
	options: Option[];
	photos: Photo[];
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
			{ id: crypto.randomUUID(), type: 'Basic', price: 0 },
			{ id: crypto.randomUUID(), type: 'Premium', price: 0 },
			{ id: crypto.randomUUID(), type: 'VIP', price: 0 },
		],
		photos: [{ id: crypto.randomUUID(), url: '' }],
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

	const handleOptionChange = (id: string, key: keyof Option, value: string) => {
		setFormData((prev) => {
			const updatedOptions = prev.options.map((option) =>
				option.id === id
					? { ...option, [key]: key === 'price' ? Number(value) : value }
					: option,
			);
			return { ...prev, options: updatedOptions };
		});
	};

	const handlePhotoChange = (id: string, value: string) => {
		setFormData((prev) => {
			const updatedPhotos = prev.photos.map((photo) =>
				photo.id === id ? { ...photo, url: value } : photo,
			);
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
					<span className="block font-medium mb-1">User:</span>
					<input
						name="user"
						value={formData.user}
						onChange={handleChange}
						placeholder="Enter your name"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<span className="block font-medium mb-1">Category:</span>
					<input
						name="category"
						value={formData.category}
						onChange={handleChange}
						placeholder="Enter category"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<span className="block font-medium mb-1">Title:</span>
					<input
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Enter title"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<span className="block font-medium mb-1">Description:</span>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Enter description"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<span className="block font-medium mb-2">Options:</span>
					{formData.options.map((option) => (
						<div key={option.id} className="flex gap-2 mb-2">
							<div className="w-1/2">
								<span className="block font-medium"></span>
								<input
									value={option.type}
									onChange={(e) =>
										handleOptionChange(option.id, 'type', e.target.value)
									}
									placeholder="Type"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
								/>
							</div>
							<div className="w-1/2">
								<span className="block font-medium"></span>
								<input
									type="number"
									value={option.price}
									onChange={(e) =>
										handleOptionChange(option.id, 'price', e.target.value)
									}
									placeholder="Price"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
								/>
							</div>
						</div>
					))}
				</div>
				<div>
					<span className="block font-medium mb-2"></span>
					{formData.photos.map((photo) => (
						<div key={photo.id} className="mb-2">
							<span className="block font-medium">Photo URL:</span>
							<input
								value={photo.url}
								onChange={(e) => handlePhotoChange(photo.id, e.target.value)}
								placeholder="Photo URL"
								className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
							/>
						</div>
					))}
				</div>
				<div className="flex gap-4">
					<div className="w-1/2">
						<span className="block font-medium mb-1">Rating Total:</span>
						<input
							name="ratingTotal"
							type="number"
							value={formData.ratingTotal}
							onChange={handleChange}
							placeholder="Rating Total"
							className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
						/>
					</div>
					<div className="w-1/2">
						<span className="block font-medium mb-1">Rating Count:</span>
						<input
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
