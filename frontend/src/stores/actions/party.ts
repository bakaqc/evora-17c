import { Dispatch } from 'redux';

import {
	ApiResponse,
	apiGetParties,
	apiGetPartiesByCategory,
} from '@/services/party';
import { actionTypes } from '@/stores/actions/actionTypes';
import { PartyQuery } from '@/utils/type';

export const getParties = (query: PartyQuery) => {
	return async (dispatch: Dispatch): Promise<void> => {
		try {
			const response: ApiResponse = await apiGetParties(query);
			if (response.success) {
				dispatch({
					type: actionTypes.GET_PARTIES,
					parties: response.data.parties,
					pagination: response.data.pagination,
				});
			} else {
				dispatch({
					type: actionTypes.GET_PARTIES,
					msg: response.message,
				});
			}
		} catch (error) {
			console.error('Error fetching parties:', error);
			dispatch({
				type: actionTypes.GET_PARTIES,
				parties: null,
				pagination: null,
			});
		}
	};
};
export const getPartiesByCategory = ({
	category,
	...query
}: {
	category: string;
	query: PartyQuery;
}) => {
	return async (dispatch: Dispatch): Promise<void> => {
		try {
			const response: ApiResponse = await apiGetPartiesByCategory({
				category,
				...query,
			});
			console.log(response);
			if (response.success) {
				dispatch({
					type: actionTypes.GET_PARTIES_BY_CATEGORY,
					parties: response.data.parties,
					pagination: response.data.pagination,
				});
			} else {
				dispatch({
					type: actionTypes.GET_PARTIES_BY_CATEGORY,
					msg: response.message,
				});
			}
		} catch (error) {
			console.error('Error fetching parties:', error);
			dispatch({
				type: actionTypes.GET_PARTIES_BY_CATEGORY,
				parties: null,
				pagination: null,
			});
		}
	};
};
