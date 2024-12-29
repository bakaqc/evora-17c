interface InputFieldProps {
	id: string;
	label: string;
	type: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type }) => {
	return (
		<div className="relative mb-6">
			<input
				type={type}
				id={id}
				className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
			/>
			<label
				htmlFor={id}
				className="absolute left-3 top-0 text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
			>
				{label}
			</label>
		</div>
	);
};

export default InputField;
