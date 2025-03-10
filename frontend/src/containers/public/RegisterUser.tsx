import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import logo1 from '@/assets/logo1.png';
import {
	ButtonForLogin,
	InputField,
	InputForRepass,
	Select,
} from '@/components';
import { AppDispatch } from '@/redux';
import * as actions from '@/stores/actions';
import { path } from '@/utils/constant';
import { Payload } from '@/utils/type';

const RegisterUser: React.FC = () => {
	interface InvalidField {
		name: string;
		msg: string;
	}

	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [payload, setPayload] = useState<Payload>({
		fullName: '',
		email: '',
		phoneNumber: '',
		dateOfBirth: '',
		address: '',
		gender: '',
		password: '',
	});
	const [invalidField, setInvalidField] = useState<InvalidField[]>([]);
	const [rePassword, setRePassword] = useState<string>('');
	const gender = [
		{ code: 'Nam', value: 'male' },
		{ code: 'Nữ', value: 'female' },
	];

	const handleSubmit = async () => {
		await dispatch(actions.register(payload));
		navigate(path.VERIFY_OTP);
	};

	return (
		<section className="gradient-form h-screen bg-neutral-200 light:bg-neutral-700 flex items-center justify-center">
			<div className="container max-w-5xl p-6 flex items-center justify-center">
				<div className="w-[50%] block rounded-lg bg-white shadow-lg light:bg-neutral-800">
					<div className="text-center py-8">
						<img className="mx-auto w-36" src={logo1} alt="logo" />
						<h4 className="mt-4 text-xl font-semibold">
							Đăng ký tài khoản mới
						</h4>
					</div>

					<div className="lg:flex lg:justify-between px-6">
						{/* Left Column */}
						<div className="lg:w-6/12 lg:pr-3 mb-6 lg:mb-0">
							{/* Full Name Input */}
							<InputField
								id="fullName"
								label="Họ và tên"
								type="text"
								invalidField={invalidField}
								value={payload.fullName}
								setValue={setPayload}
								setInvalidField={setInvalidField}
							/>

							{/* Email Input */}
							<InputField
								id="email"
								label="Email"
								type="text"
								invalidField={invalidField}
								value={payload.email}
								setValue={setPayload}
								setInvalidField={setInvalidField}
							/>

							{/* Phone Number Input */}
							<InputField
								id="phoneNumber"
								label="Số điện thoại"
								type="text"
								invalidField={invalidField}
								value={payload.phoneNumber}
								setValue={setPayload}
								setInvalidField={setInvalidField}
							/>

							{/* Date of Birth Input */}
							<InputField
								id="dateOfBirth"
								label="Ngày sinh"
								type="date"
								invalidField={invalidField}
								value={payload.dateOfBirth ? payload.dateOfBirth : ''}
								setValue={setPayload}
								setInvalidField={setInvalidField}
							/>
						</div>

						{/* Right Column */}
						<div className="lg:w-6/12 lg:pl-3">
							{/* Address Input */}
							<InputField
								id="address"
								label="Địa chỉ"
								type="text"
								invalidField={invalidField}
								value={payload.address}
								setValue={setPayload}
								setInvalidField={setInvalidField}
							/>

							{/* Gender Select */}
							<Select
								label="Giới tính"
								options={gender}
								value={payload.gender}
								setValue={setPayload}
								name="gender"
							/>

							{/* Password Input */}
							<InputField
								id="password"
								label="Mật khẩu"
								type="password"
								invalidField={invalidField}
								value={payload.password}
								setValue={setPayload}
								setInvalidField={setInvalidField}
							/>

							{/* Re-Password Input */}
							<InputForRepass
								id="re-password"
								label="Nhập lại mật khẩu"
								type="password"
								value={rePassword}
								setValue={setRePassword}
								invalidField={invalidField}
								setInvalidField={setInvalidField}
							/>
						</div>
					</div>

					<div className="text-center p-6">
						<ButtonForLogin label="Đăng ký" onClick={handleSubmit} />

						<div className="mt-4 flex items-center justify-center gap-2">
							<p className="text-sm">Đã có tài khoản?</p>
							<NavLink
								to={path.LOGIN_USER}
								className="mt-2 rounded border border-blue-500 px-4 py-2 text-sm text-blue-500 hover:bg-blue-50"
							>
								Đăng nhập
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterUser;
