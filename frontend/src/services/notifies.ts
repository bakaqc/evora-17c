import axiosConfig from '../axiosConfig';

interface NotifyDto {
	users: string[];
	title: string;
	message: string;
}

interface ApiResponse {
	success: boolean;
	message: string;
}

interface Query {
	notifyDto: NotifyDto;
	template: string;
}

export const apiSendNotifies = (query: Query): Promise<ApiResponse> => {
	return new Promise((resolve, reject) => {
		axiosConfig
			.post('/api/notifies/send-email-notification', query)
			.then((response) => resolve(response.data as ApiResponse))
			.catch((err) => reject(new Error(err)));
	});
};
