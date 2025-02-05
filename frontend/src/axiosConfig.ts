import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { apiBaseUrl } from '@/utils/apiBase';

const instance = axios.create({
	baseURL: apiBaseUrl,
});
instance.interceptors.request.use(
	function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
		// Gắn token vào header
		const authData = window.localStorage.getItem('persist:auth');
		const token = authData
			? JSON.parse(authData)?.token?.replace(/"/g, '')
			: null;

		console.log('Token trong header:', token);

		if (config.headers) {
			config.headers.authorization = token ? `Bearer ${token}` : null;
		}

		return config;
	},
	function (error: unknown): Promise<never> {
		// Đảm bảo trả về một Error
		return Promise.reject(
			error instanceof Error ? error : new Error(String(error)),
		);
	},
);

instance.interceptors.response.use(
	function (response: AxiosResponse): AxiosResponse {
		return response;
	},
	function (error: unknown): Promise<never> {
		// Đảm bảo trả về một Error
		return Promise.reject(
			error instanceof Error ? error : new Error(String(error)),
		);
	},
);

export default instance;
