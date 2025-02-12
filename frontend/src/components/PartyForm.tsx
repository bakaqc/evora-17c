import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { apiCreateParty } from '@/services/party';

interface Option {
	_id: string;
	type: string;
	price: number;
}

export interface FormData {
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
		user: '6775073942bd87dd4e77450b',
		category: 'Sinh nhật',
		title: '',
		description: '',
		options: [
			{ _id: 'opt1', type: 'Basic', price: 0 },
			{ _id: 'opt2', type: 'Premium', price: 0 },
			{ _id: 'opt3', type: 'VIP', price: 0 },
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
			const updatedOptions = prev.options.map((option, i) =>
				i === index
					? { ...option, [key]: key === 'price' ? Number(value) : value }
					: option,
			);
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await apiCreateParty(formData);
			toast.success(response.message);
		} catch (error) {
			console.error('Error creating party:', error);
			alert('Failed to create party');
		}
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-6">Tạo sự kiện</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<span className="block font-medium mb-1">Thể loại:</span>
					<input
						name="category"
						value={formData.category}
						onChange={handleChange}
						placeholder="Enter category"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<span className="block font-medium mb-1">Tiêu đề:</span>
					<input
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Enter title"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<span className="block font-medium mb-1">Mô tả:</span>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Enter description"
						className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<span className="block font-medium mb-2">Lựa chọn:</span>
					{formData.options.map((option, index) => (
						<div key={option._id} className="flex gap-2 mb-2">
							<div className="w-1/2">
								<input
									value={option.type}
									onChange={(e) =>
										handleOptionChange(index, 'type', e.target.value)
									}
									placeholder="Type"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
								/>
							</div>
							<div className="w-1/2">
								<input
									type="number"
									value={option.price}
									onChange={(e) =>
										handleOptionChange(index, 'price', e.target.value)
									}
									placeholder="Price"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
								/>
							</div>
						</div>
					))}
				</div>
				<div>
					<span className="block font-medium mb-2">Ảnh:</span>
					{formData.photos.map((photo, index) => (
						<div key={index} className="mb-2">
							<input
								value={photo}
								onChange={(e) => handlePhotoChange(index, e.target.value)}
								placeholder="Photo URL"
								className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
							/>
						</div>
					))}
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
