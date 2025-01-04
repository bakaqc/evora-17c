interface InputFieldProps {
	id: string;
	label?: string;
	type?: string;
	value?: string;
	setValue?: React.Dispatch<React.SetStateAction<string>>;
	invalidField?: { name: string; msg: string }[]; // Chuyển sang dạng object để dễ kiểm tra
	setInvalidField?: React.Dispatch<
		React.SetStateAction<{ name: string; msg: string }[]>
	>;
}

const InputField: React.FC<InputFieldProps> = ({
	id,
	label,
	type,
	value,
	setValue,
	invalidField = [],
	setInvalidField,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (setValue) {
			setValue(e.target.value);
		}
	};
	const errorMsg = invalidField.find((field) => field.name === id)?.msg;

	return (
		<div className="relative mb-6">
			<input
				type={type || 'text'}
				id={id}
				className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
				value={value}
				onChange={handleChange}
				onFocus={() => {
					if (setInvalidField) {
						setInvalidField([]);
					}
				}}
			/>
			<label
				htmlFor={id}
				className="absolute left-3 top-[-5px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
			>
				{label}
			</label>
			{errorMsg && <p className="mt-1 text-xs text-red-500">{errorMsg}</p>}
		</div>
	);
};

export default InputField;
