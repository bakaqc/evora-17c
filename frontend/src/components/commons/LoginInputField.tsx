import React from 'react';

interface LoginInputFieldProps {
	id: string;
	label: string;
	type: string;
	invalidField: { name: string; msg: string }[];
	value: string;
	setValue: (value: string) => void;
	setInvalidField: (fields: { name: string; msg: string }[]) => void;
}

const LoginInputField: React.FC<LoginInputFieldProps> = ({
	id,
	label,
	type,
	invalidField,
	value,
	setValue,
	setInvalidField,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		setInvalidField(invalidField.filter((field) => field.name !== id));
	};

	return (
		<div className="mb-4">
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 dark:text-neutral-200"
			>
				{label}
			</label>
			<input
				id={id}
				type={type}
				value={value}
				onChange={handleChange}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-200"
			/>
			{invalidField.some((field) => field.name === id) && (
				<p className="mt-2 text-sm text-red-600">
					{invalidField.find((field) => field.name === id)?.msg}
				</p>
			)}
		</div>
	);
};

export default LoginInputField;
