import React, { memo } from 'react';

import { Payload } from '@/ultils/type';

interface SelectProps {
	label?: string;
	options?: Array<{ code: string; value: string }>;
	value?: string | number;
	setValue?: React.Dispatch<React.SetStateAction<Payload>>;
	name?: string;
	invalidField?: string[];
	setInvalidField?: React.Dispatch<React.SetStateAction<string[]>>;
	reset?: boolean;
}

const Select: React.FC<SelectProps> = ({
	label,
	options,
	value,
	setValue,
	name,
	reset,
}) => {
	return (
		<div className="relative mb-8">
			<select
				id={name || label}
				value={reset ? '' : value}
				onChange={(e) => {
					if (setValue) {
						if (!name) {
							setValue((prev) => ({
								...prev,
								gender: e.target.value,
							}));
						} else {
							setValue((prev) => ({
								...prev,
								[name]: e.target.value,
							}));
						}
					}
				}}
				className="peer block w-full appearance-none rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:bg-neutral-800 dark:placeholder:text-neutral-300"
			>
				{options?.map((item) => (
					<option key={item.value} value={item.value}>
						{item.code}
					</option>
				))}
			</select>
			<label
				htmlFor={name || label}
				className="absolute left-3 top-[-10px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary"
			>
				{label}
			</label>
		</div>
	);
};

export default memo(Select);
