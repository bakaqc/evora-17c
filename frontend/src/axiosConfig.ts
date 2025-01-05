import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
	function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
		// Gắn token vào header
		const authData = window.localStorage.getItem('persist:auth');
		const token = authData && JSON.parse(authData)?.token?.slice(1, -1);

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
