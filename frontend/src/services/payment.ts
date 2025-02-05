import axios from 'axios';

import { apiBaseUrl } from '@/utils/apiBase';

export const apiGetPaymentByBookingId = async (id: string, token: string) => {
	const response = await axios.get(`${apiBaseUrl}/api/payments/booking/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
