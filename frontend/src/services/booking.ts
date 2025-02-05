import axiosConfig from '../axiosConfig';
import axios from 'axios';

import { apiBaseUrl } from '@/utils/apiBase';

export interface Booking {
	party: string;
	user: string;
	guestCount: number;
	status: string;
	payment: string;
	organizeDate: string;
	organizedAt: string;
}

export interface ApiResponse {
	success: boolean;
	message: string;
	data: Booking & {
		_id: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
	};
}

export const apiCreateBooking = (query: Booking): Promise<ApiResponse> => {
	return new Promise((resolve, reject) => {
		axiosConfig
			.post('/api/bookings', query)
			.then((response) => resolve(response.data as ApiResponse))
			.catch((err) => reject(new Error(err)));
	});

export const apiGetBookingByUserId = async (id: string, token: string) => {
	const response = await axios.get(`${apiBaseUrl}/api/bookings/user/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
