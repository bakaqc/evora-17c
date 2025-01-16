import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import PageNumber from '@/components/PageNumber';
import { RootState } from '@/stores/reducers/rootReducer';
import icons from '@/utils/icons';

const { TbPlayerTrackPrev, TbPlayerTrackNext } = icons;

const Pagination: React.FC = () => {
	const { pagination, parties } = useSelector(
		(state: RootState) => state.party,
	);
	const [arrPage, setArrPage] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isHideEnd, setIsHideEnd] = useState(false);
	const [isHideStart, setIsHideStart] = useState(false);
	const [searchParam] = useSearchParams();
	useEffect(() => {
		const page = searchParam.get('page');
		if (page && +page !== currentPage) {
			setCurrentPage(+page);
		} else if (!page) {
			setCurrentPage(1);
		}
	}, [searchParam]);

	useEffect(() => {
		const end =
			currentPage + 3 > (pagination?.totalPages ?? 1)
				? (pagination?.totalPages ?? 1)
				: currentPage + 3;
		const start = currentPage - 3 <= 0 ? 1 : currentPage - 3;
		const temp = [];
		for (let i = start; i <= end; i++) {
			temp.push(i);
		}
		setArrPage(temp);
		if (currentPage + 3 >= (pagination?.totalPages ?? 1)) {
			setIsHideEnd(true);
		} else {
			setIsHideEnd(false);
		}

		if (currentPage - 3 <= 1) {
			setIsHideStart(true);
		} else {
			setIsHideStart(false);
		}
	}, [pagination, parties, currentPage]);
	return (
		<div className="flex items-center justify-center gap-2 py-5">
			{!isHideStart && (
				<PageNumber
					icon={<TbPlayerTrackPrev />}
					setCurrentPage={setCurrentPage}
					text="1"
				/>
			)}
			{!isHideStart && <PageNumber text={'...'} />}
			{arrPage?.length > 0 &&
				arrPage.map((i: number) => {
					return (
						<PageNumber
							key={i}
							text={`${i}`}
							currentPage={currentPage || 1}
							setCurrentPage={setCurrentPage}
						/>
					);
				})}
			{!isHideEnd && <PageNumber text={'...'} />}
			{!isHideEnd && (
				<PageNumber
					icon={<TbPlayerTrackNext />}
					setCurrentPage={setCurrentPage}
					text={`${pagination?.totalPages}`}
				/>
			)}
		</div>
	);
};

export default Pagination;
