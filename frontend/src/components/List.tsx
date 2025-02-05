/* eslint-disable @typescript-eslint/no-explicit-any */
import diacritics from 'diacritics';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Item } from '@/components';
import Pagination from '@/containers/public/Pagination';
import { AppDispatch } from '@/redux';
import { getParties } from '@/stores/actions';
import { RootState } from '@/stores/reducers/rootReducer';

interface ListProps {
	categoriesCode?: string;
}

const List: React.FC<ListProps> = () => {
	const { parties } = useSelector((state: RootState) => state.party);
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch: AppDispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const removeDiacritics = (str: string) => {
		return diacritics.remove(str);
	};

	const filterParties = (searchTerm: string, parties: any[]) => {
		const lowerCaseTerm = removeDiacritics(searchTerm.toLowerCase());
		return parties.filter((party) => {
			const title = removeDiacritics(party.title.toLowerCase());
			const description = removeDiacritics(party.description.toLowerCase());
			const category = removeDiacritics(party.category.toLowerCase());

			return (
				title.includes(lowerCaseTerm) ||
				description.includes(lowerCaseTerm) ||
				category.includes(lowerCaseTerm)
			);
		});
	};

	useEffect(() => {
		setIsLoading(true);
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
		dispatch(getParties(query)).finally(() => {
			setIsLoading(false);
		});
	}, [searchParams, dispatch]);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearchParams({ search: searchTerm });
	};

	const filteredParties = filterParties(searchTerm, parties);

	return (
		<div className="w-full p-2 bg-[#FAF3EB] shadow-md rounded-md px-6">
			<div className="items-center justify-center text-center">
				<h1 className="font-serif mb-1.5 text-[25px] font-semibold text-[#E88F2A]">
					Danh sách sự kiện nổi bật
				</h1>
				<p className="text-[40px] font-bold mb-4 text-[#2B2825]">
					KHÁM PHÁ NGAY
				</p>
			</div>
			<div className="flex items-center justify-center gap-2 my-5">
				<form onSubmit={handleSearch} className="flex items-center gap-2">
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="p-2 border rounded-md"
						placeholder="Sự kiện hấp dẫn..."
					/>
					<button
						type="submit"
						className="flex items-center p-2 bg-blue-500 text-white rounded-md"
					>
						<FaSearch className="mr-2" /> Tìm kiếm
					</button>
				</form>
			</div>
			<div className="flex gap-4 my-5">
				{isLoading ? (
					<p className="text-center w-full">Đang tải sự kiện...</p>
				) : filteredParties?.length > 0 ? (
					filteredParties.map((item) => {
						return (
							<Item
								key={item._id}
								id={item._id}
								user={item.user}
								options={item.options}
								image={item?.photos[0]}
								title={item?.title}
								ratingCount={item?.ratingCount}
								ratingTotal={item?.ratingTotal}
								category={item?.category}
							/>
						);
					})
				) : (
					<p className="text-center w-full">Không tìm thấy sự kiện nào!</p>
				)}
			</div>
			<Pagination />
		</div>
	);
};

export default List;
