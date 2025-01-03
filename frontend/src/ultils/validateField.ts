type Payload = Record<string, string | number | null>;

interface InvalidField {
	name: string;
	msg: string;
}

const addError = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
	msg: string,
) => {
	if (!invalidFields.some((item) => item.name === key)) {
		invalidFields.push({ name: key, msg });
	}
};

const validateRequired = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
) => {
	if (value === '' || value === null) {
		addError(key, value, invalidFields, 'Trường này bắt buộc nhập.');
	}
};

const validateFullName = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
) => {
	if (typeof value === 'string' && value.trim() === '') {
		addError(key, value, invalidFields, 'Họ và tên không được bỏ trống.');
	}
};

const validateEmail = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
) => {
	if (typeof value === 'string' && !value.includes('@')) {
		addError(key, value, invalidFields, 'Email không hợp lệ.');
	}
};

const validatePhone = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
) => {
	if (typeof value === 'string') {
		if (isNaN(+value)) {
			addError(key, value, invalidFields, 'Số điện thoại không hợp lệ.');
		} else if (value.length !== 10) {
			addError(
				key,
				value,
				invalidFields,
				'Số kí tự không hợp lệ cho điện thoại.',
			);
		} else if (!value.startsWith('0')) {
			addError(key, value, invalidFields, 'Số điện thoại phải bắt đầu bằng 0.');
		}
	}
};

const validatePassword = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
) => {
	if (typeof value === 'string' && value.length < 6) {
		addError(key, value, invalidFields, 'Mật khẩu cần có ít nhất là 6 kí tự.');
	}
};

const validateDateOfBirthAddressGender = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
) => {
	if (value === '' || value === null) {
		addError(key, value, invalidFields, 'Trường không được bỏ trống.');
	}
};

const validateOtp = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
) => {
	if (typeof value === 'string' && value.trim() === '') {
		addError(key, value, invalidFields, 'OTP không được bỏ trống.');
	}
};

const validateField = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
) => {
	switch (key) {
		case 'fullName':
			validateFullName(key, value, invalidFields);
			break;
		case 'email':
			validateEmail(key, value, invalidFields);
			break;
		case 'phone':
			validatePhone(key, value, invalidFields);
			break;
		case 'password':
			validatePassword(key, value, invalidFields);
			break;
		case 'dateOfBirth':
		case 'address':
		case 'gender':
			validateDateOfBirthAddressGender(key, value, invalidFields);
			break;
		case 'otp':
			validateOtp(key, value, invalidFields);
			break;
		default:
			validateRequired(key, value, invalidFields); // Check if field is required
			break;
	}
};

const validate = (
	payload: Payload,
	setInvalidField: React.Dispatch<React.SetStateAction<InvalidField[]>>,
): number => {
	const invalidFields: InvalidField[] = [];
	for (const [key, value] of Object.entries(payload)) {
		validateField(key, value, invalidFields);
	}

	setInvalidField(invalidFields);
	return invalidFields.length > 0 ? 1 : 0;
};

export default validate;
