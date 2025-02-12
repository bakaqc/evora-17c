import axiosConfig from '@/axiosConfig';
import { PartyType } from '@/schemas/party.schema';

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
}

export const getParties = async (
	token: string,
	page: number = 1,
	limit: number = 10,
): Promise<ApiResponse<PartyType[]>> => {
	try {
		const response = await axiosConfig.get(
			`/api/parties?page=${page}&limit=${limit}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		console.log('API Response:', response);
		return {
			success: true,
			message: 'Parties fetched successfully',
			data: response.data.data?.parties || [],
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
