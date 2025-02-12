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
		setFormData((prev) => ({ ...prev, [name]: value }));
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
		<div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
			<h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
				Tạo Sự Kiện
			</h2>
			<form onSubmit={handleSubmit} className="space-y-5">
				<div className="grid grid-cols-2 gap-4">
					{/* User */}
					<div>
						<label className="block text-gray-700 font-medium">User:</label>
						<input
							name="user"
							value={formData.user}
							onChange={handleChange}
							placeholder="Enter your name"
							className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
						/>
					</div>
					{/* Category */}
					<div>
						<label className="block text-gray-700 font-medium">Category:</label>
						<input
							name="category"
							value={formData.category}
							onChange={handleChange}
							placeholder="Enter category"
							className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
						/>
					</div>
				</div>

				{/* Title & Description */}
				<div>
					<label className="block text-gray-700 font-medium">Title:</label>
					<input
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Enter title"
						className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
					/>
				</div>
				<div>
					<label className="block text-gray-700 font-medium">
						Description:
					</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Enter description"
						className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
						rows={4}
					/>
				</div>

				{/* Options */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Options:
					</label>
					{formData.options.map((option) => (
						<div key={option.id} className="flex gap-3 items-center mb-2">
							<input
								value={option.type}
								onChange={(e) =>
									handleOptionChange(option.id, 'type', e.target.value)
								}
								placeholder="Type"
								className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
							/>
							<input
								type="number"
								value={option.price}
								onChange={(e) =>
									handleOptionChange(option.id, 'price', e.target.value)
								}
								placeholder="Price"
								className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
							/>
						</div>
					))}
				</div>

				{/* Photos */}
				<div>
					<label className="block text-gray-700 font-medium">Photos:</label>
					{formData.photos.map((photo) => (
						<div key={photo.id} className="flex items-center gap-3 mb-2">
							<input
								value={photo.url}
								onChange={(e) => handlePhotoChange(photo.id, e.target.value)}
								placeholder="Photo URL"
								className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
							/>
						</div>
					))}
				</div>
				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold p-3 rounded-lg hover:opacity-90 transition"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default PartyForm;
