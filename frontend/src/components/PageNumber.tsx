import React, { ReactNode, memo } from 'react';
import {
	createSearchParams,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';

interface PageNumberProps {
	text?: string;
	currentPage?: number;
	icon?: ReactNode;
	setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

const notActive =
	'w-[46px] h-[48px] flex justify-center items-center px-5 py-3 bg-white hover:bg-gray-300 rounded-md';
const active =
	'w-[46px] h-[48px] flex justify-center items-center px-5 py-3 bg-[#E88F2A] text-white rounded-md cursor-pointer';

const PageNumber: React.FC<PageNumberProps> = ({
	text = '1',
	currentPage = 1,
	setCurrentPage,
	icon,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [paramsSearch] = useSearchParams();
	const entries = paramsSearch.entries();

	const append = (entries: IterableIterator<[string, string]>) => {
		const params: [string, string][] = [];
		paramsSearch.append('page', String(text ?? ''));
		for (const entry of entries) {
			params.push(entry);
		}
		const searchParamsObject: Record<string, string | string[]> = {};

		params?.forEach((i) => {
			if (
				Object.keys(searchParamsObject).some(
					(item) => item === i[0] && item !== 'page',
				)
			) {
				const existingValue = searchParamsObject[i[0]];

				if (Array.isArray(existingValue)) {
					searchParamsObject[i[0]] = [...existingValue, i[1]];
				} else {
					searchParamsObject[i[0]] = [existingValue, i[1]];
				}
			} else {
				searchParamsObject[i[0]] = i[1];
			}
		});

		return searchParamsObject;
	};

	const handleChangePage = () => {
		if (!(text === '...')) {
			if (setCurrentPage) {
				setCurrentPage(+text);
			}
			navigate({
				pathname: location?.pathname,
				search: createSearchParams(append(entries)).toString(),
			});
		}
	};

	const buttonClass =
		+text === +currentPage
			? active
			: `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`;

	return (
		<button
			className={buttonClass}
			onClick={handleChangePage}
			aria-label={`Page number ${text}`}
		>
			{icon || text}
		</button>
	);
};

export default memo(PageNumber);
