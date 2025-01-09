import InputForLogin from '../InputForLogin';
import React from 'react';

interface LoginInputFieldProps {
	id: string;
	label: string;
	type: string;
	invalidField: { name: string; msg: string }[];
	value: string;
	setValue: (value: any) => void;
	setInvalidField: (value: any) => void;
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
	return (
		<InputForLogin
			id={id}
			label={label}
			type={type}
			invalidField={invalidField}
			value={value}
			setValue={setValue}
			setInvalidField={setInvalidField}
		/>
	);
};

export default LoginInputField;
