import axios from 'axios';

import { apiBaseUrl } from '@/utils/apiBase';

export const apiGetBookingByUserId = async (id: string, token: string) => {
	const response = await axios.get(`${apiBaseUrl}/api/bookings/user/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
