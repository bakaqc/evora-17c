import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Item } from '@/components';
import { AppDispatch } from '@/redux';
import { getParties } from '@/stores/actions';
import { RootState } from '@/stores/reducers/rootReducer';

interface ListProps {
	categoriesCode?: string;
}

const List: React.FC<ListProps> = () => {
	const { parties } = useSelector((state: RootState) => state.party);
	const [searchParams] = useSearchParams();
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		const params: [string, string][] = [];
		for (const entry of searchParams.entries()) {
			params.push(entry);
		}

		const searchParamsObject: { [key: string]: string[] } = {};
		params.forEach(([key, value]) => {
			if (Object.keys(searchParamsObject).includes(key)) {
				searchParamsObject[key] = [...searchParamsObject[key], value];
			} else {
				searchParamsObject[key] = [value];
			}
		});
		const query = {
			...searchParamsObject,
			limit: 8,
		};
		dispatch(getParties(query));
	}, [searchParams]);
	console.log(parties);
	return (
		<div className="w-full p-2 bg-[#FAF3EB] shadow-md rounded-md px-6">
			<div className="flex items-center gap-2 my-2"></div>
			<div className="flex gap-4 overflow-x-auto">
				{parties?.length > 0 &&
					parties.map((item) => {
						return (
							<Item
								key={item._id}
								id={item._id}
								description={item?.description}
								image={item?.photos[0]}
								title={item?.title}
								ratingCount={item?.ratingCount}
								ratingTotal={item?.ratingTotal}
								category={item?.category}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default List;
