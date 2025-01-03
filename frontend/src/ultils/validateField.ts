type Payload = Record<string, string | number | null>;

interface InvalidField {
	name: string;
	msg: string;
}

const validateField = (
	key: string,
	value: string | number | null,
	invalidFields: InvalidField[],
) => {
	const addError = (msg: string) => {
		if (!invalidFields.some((item) => item.name === key)) {
			invalidFields.push({ name: key, msg });
		}
	};

	if (value === '' || value === null) {
		addError('Trường này bắt buộc nhập.');
	}

	switch (key) {
		case 'fullName':
			if (typeof value === 'string' && value.trim() === '') {
				addError('Họ và tên không được bỏ trống.');
			}
			break;
		case 'email':
			if (typeof value === 'string' && !value.includes('@')) {
				addError('Email không hợp lệ.');
			}
			break;
		case 'phone':
			if (typeof value === 'string') {
				if (isNaN(+value)) {
					addError('Số điện thoại không hợp lệ.');
				}
				if (value.length !== 10) {
					addError('Số kí tự không hợp lệ cho điện thoại.');
				}
				if (!value.startsWith('0')) {
					addError('Số điện thoại phải bắt đầu bằng 0.');
				}
			}
			break;
		case 'password':
			if (typeof value === 'string' && value.length < 6) {
				addError('Mật khẩu cần có ít nhất là 6 kí tự.');
			}
			break;
		case 'dateOfBirth':
		case 'address':
		case 'gender':
			if (value === '' || value === null) {
				addError(`Trường không được bỏ trống.`);
			}
			break;
		case 'otp':
			if (typeof value === 'string' && value.trim() === '') {
				addError('OTP không được bỏ trống.');
			}
			break;
		default:
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
