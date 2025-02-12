import axiosConfig from '../axiosConfig';
import axios from 'axios';

import { apiBaseUrl } from '@/utils/apiBase';

interface Option {
	type: string;
	price: number;
	_id?: string;
}

export interface Party {
	_id: string;
	user: string;
	category: string;
	title: string;
	description: string;
	options: Option[];
	photos: string[];
	ratingTotal: number;
	ratingCount: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface Option {
	_id?: string;
	type: string;
	price: number;
}

interface PartyQuery {
	user?: string;
	category?: string;
	title?: string;
	description?: string;
	options?: Option[];
	photos?: string[];
	ratingTotal?: number;
	ratingCount?: number;
}

interface Pagination {
	total: number;
	page: string;
	limit: string;
	totalPages: number;
}

export interface ApiResponse {
	success: boolean;
	message: string;
	data: {
		pagination: Pagination;
		parties: Party[];
	};
}

export const apiGetParties = (query: PartyQuery): Promise<ApiResponse> => {
	return new Promise((resolve, reject) => {
		axiosConfig({
			method: 'GET',
			url: '/api/parties',
			params: query,
		})
			.then((response) => resolve(response.data as ApiResponse))
			.catch((err) => reject(new Error(err)));
	});
};

export const apiGetPartiesByCategory = ({
	category,
	...query
}: {
	category: string;
	query: PartyQuery;
}): Promise<ApiResponse> => {
	return new Promise((resolve, reject) => {
		axiosConfig({
			method: 'GET',
			url: `/api/parties/category/${category}`,
			params: query,
		})
			.then((response) => resolve(response.data as ApiResponse))
			.catch((err) => reject(new Error(err)));
	});
};

export const apiGetPartyById = async (id: string) => {
	const response = await axios.get(`${apiBaseUrl}/api/parties/${id}`);
	return response.data;
};
export const apiCreateParty = (query: PartyQuery): Promise<ApiResponse> => {
	return new Promise((resolve, reject) => {
		axiosConfig
			.post('/api/parties', query)
			.then((response) => resolve(response.data as ApiResponse))
			.catch((err) => reject(new Error(err)));
	});
};
