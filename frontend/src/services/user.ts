import axios from 'axios';

import { apiBaseUrl } from '@/utils/apiBase';

export const apiGetUser = async (identifier: string) => {
	const response = await axios.get(`${apiBaseUrl}/api/users/${identifier}`);
	return response.data;
};
