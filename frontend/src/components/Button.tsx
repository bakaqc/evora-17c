import React, { FC, memo } from 'react';

interface ButtonProps {
	text?: string;
	textColor?: string;
	bgColor?: string;
	IcAfter?: React.ElementType;
	IcBefor?: React.ElementType;
	onClick?: () => void;
	fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
	text,
	textColor = 'text-black',
	bgColor = 'bg-white',
	IcAfter,
	onClick,
	fullWidth = false,
	IcBefor,
}) => {
	return (
		<button
			type="button"
			className={`py-2 px-4 ${textColor} ${bgColor} ${
				fullWidth ? 'w-full' : ''
			} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
			onClick={onClick}
		>
			{IcBefor && <IcBefor />}
			<span className="text-center">{text}</span>
			{IcAfter && <IcAfter />}
		</button>
	);
};

export default memo(Button);
