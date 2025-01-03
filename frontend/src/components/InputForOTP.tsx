import { PayloadForOtp } from '@/ultils/type';

interface InputFieldProps {
	id: string;
	label?: string;
	type?: string;
	value?: string;
	setValue?: React.Dispatch<React.SetStateAction<PayloadForOtp>>;
	invalidField?: string[];
	setInvalidField?: (value: string[]) => void;
}

const InputForOtp: React.FC<InputFieldProps> = ({
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
			setValue((prev: PayloadForOtp) => ({
				...prev,
				[id]: e.target.value,
			}));
		}
	};
	return (
		<div className="relative mb-8">
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
			{invalidField && (
				<p className="mt-1 text-xs text-red-500">{invalidField}</p>
			)}
		</div>
	);
};

export default InputForOtp;
