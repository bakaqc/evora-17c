type Payload = Record<string, string | number | null>;

interface InvalidField {
	name: string;
	msg: string;
}

const validate = (
	payload: Payload,
	setInvalidField: React.Dispatch<React.SetStateAction<InvalidField[]>>,
): number => {
	const field = Object.entries(payload);
	const invalidFields: InvalidField[] = []; // Mảng lưu tất cả các lỗi

	for (const [key, value] of field) {
		// Kiểm tra trường hợp bỏ trống
		if (value === '' || value === null) {
			invalidFields.push({ name: key, msg: `Trường này bắt buộc nhập.` });
		}

		switch (key) {
			case 'fullName':
				if (
					typeof value === 'string' &&
					value === '' &&
					!invalidFields.some((item) => item.name === key)
				) {
					invalidFields.push({
						name: key,
						msg: 'Họ và tên không được bỏ trống.',
					});
				}
				break;
			case 'email':
				if (
					typeof value === 'string' &&
					!value.includes('@') &&
					!invalidFields.some((item) => item.name === key)
				) {
					invalidFields.push({ name: key, msg: 'Email không hợp lệ.' });
				}
				break;
			case 'phone':
				if (typeof value === 'string') {
					if (
						isNaN(+value) &&
						!invalidFields.some((item) => item.name === key)
					) {
						invalidFields.push({
							name: key,
							msg: 'Số điện thoại không hợp lệ.',
						});
					}
					if (
						value.length !== 10 &&
						!invalidFields.some((item) => item.name === key)
					) {
						invalidFields.push({
							name: key,
							msg: 'Số kí tự không hợp lệ cho điện thoại.',
						});
					}
					if (
						value[0] !== '0' &&
						!invalidFields.some((item) => item.name === key)
					) {
						invalidFields.push({
							name: key,
							msg: 'Số điện thoại phải bắt đầu bằng 0.',
						});
					}
				}
				break;
			case 'password':
				if (
					typeof value === 'string' &&
					value.length < 6 &&
					!invalidFields.some((item) => item.name === key)
				) {
					invalidFields.push({
						name: key,
						msg: 'Mật khẩu cần có ít nhất là 6 kí tự.',
					});
				}
				break;
			case 'dateOfBirth':
				if (value === '' || value === null) {
					invalidFields.push({
						name: key,
						msg: 'Ngày sinh không được bỏ trống.',
					});
				}
				break;
			case 'address':
				if (value === '' || value === null) {
					invalidFields.push({
						name: key,
						msg: 'Địa chỉ không được bỏ trống.',
					});
				}
				break;
			case 'gender':
				if (value === '' || value === null) {
					invalidFields.push({
						name: key,
						msg: 'Giới tính không được bỏ trống.',
					});
				}
				break;
			case 'otp':
				if (
					typeof value === 'string' &&
					value === '' &&
					!invalidFields.some((item) => item.name === key)
				) {
					invalidFields.push({ name: key, msg: 'OTP không được bỏ trống.' });
				}
				break;
			default:
				break;
		}
	}

	// Cập nhật trạng thái với tất cả các lỗi
	setInvalidField(invalidFields);

	// Nếu có lỗi, trả về 1, nếu không có lỗi, trả về 0
	return invalidFields.length > 0 ? 1 : 0;
};

export default validate;
