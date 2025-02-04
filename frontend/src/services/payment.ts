import axiosConfig from '../axiosConfig';

export interface Payment {
	booking: string;
	voucher: string;
	method: string;
	originPrice: number;
	finalPrice: number;
}

export interface ApiResponse {
	payment_url: string;
}

export const apiCreatePayment = (query: Payment): Promise<ApiResponse> => {
	return new Promise((resolve, reject) => {
		axiosConfig
			.post('/api/payments', query)
			.then((response) => resolve(response.data as ApiResponse))
			.catch((err) => reject(new Error(err)));
	});
};
