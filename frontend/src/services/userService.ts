import axiosConfig from '@/axiosConfig';
import { User } from '@/schemas/user.schema';

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
}

export const getUsers = async (
	token: string,
	page: number = 1,
	limit: number = 100,
): Promise<ApiResponse<User[]>> => {
	try {
		const response = await axiosConfig.get(
			`/api/users?page=${page}&limit=${limit}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		console.log('API Response:', response);
		return {
			success: true,
			message: 'Users fetched successfully',
			data: response.data.data.users,
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
