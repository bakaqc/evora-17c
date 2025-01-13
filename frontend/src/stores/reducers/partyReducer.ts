import { actionTypes } from '@/stores/actions/actionTypes';

export interface Option {
	type: string;
	price: number;
	_id: string;
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

interface PartyState {
	parties: Party[];
	msg: string;
	pagination?: {
		total: number | null;
		page: string | null;
		limit: string | null;
		totalPages: number | null;
	};
}

interface Action {
	type: string;
	parties?: Party[];
	msg?: string;
	pagination?: {
		total: number | null;
		page: string | null;
		limit: string | null;
		totalPages: number | null;
	};
}

const initState: PartyState = {
	parties: [],
	msg: '',
	pagination: {
		total: null,
		page: null,
		limit: null,
		totalPages: null,
	},
};

const partyReducer = (
	state: PartyState = initState,
	action: Action,
): PartyState => {
	switch (action.type) {
		case actionTypes.GET_PARTIES:
		case actionTypes.GET_PARTIES_BY_CATEGORY:
			return {
				...state,
				parties: action.parties ?? [],
				msg: action.msg ?? '',
				pagination: action.pagination ?? state.pagination,
			};
		default:
			return state;
	}
};

export default partyReducer;
