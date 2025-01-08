import axios from 'axios';

import { User } from '@/schemas/user.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const fetchAllUsers = async (token: string): Promise<User[]> => {
	const response = await axios.get<User[]>(
		`${apiBaseUrl}/api/users?page=1&limit=10`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response.data;
};
