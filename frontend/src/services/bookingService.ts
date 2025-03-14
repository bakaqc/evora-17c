import axiosConfig from '@/axiosConfig';
import { Booking } from '@/schemas/booking.schema';

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
}

export const getBookings = async (
	token: string,
	page: number = 1,
	limit: number = 100,
): Promise<ApiResponse<Booking[]>> => {
	try {
		const response = await axiosConfig.get(
			`/api/bookings?page=${page}&limit=${limit}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		console.log('API Response:', response);
		return {
			success: true,
			message: 'Bookings fetched successfully',
			data: response.data.data?.bookings || [],
		};
	} catch (error) {
		console.error('API Error:', error);
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			};
		}
		return {
			success: false,
			message: 'An unknown error occurred',
		};
	}
};
