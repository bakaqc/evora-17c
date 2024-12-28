interface ButtonProps {
	label: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
}

const ButtonForLogin: React.FC<ButtonProps> = ({
	label,
	type = 'button',
	onClick,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className="w-full rounded bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-700 px-6 py-2.5 text-lg font-medium text-white shadow-lg transition duration-150 ease-in-out hover:shadow-xl"
		>
			{label}
		</button>
	);
};
export default ButtonForLogin;
