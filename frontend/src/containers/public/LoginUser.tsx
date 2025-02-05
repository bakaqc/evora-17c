/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import hero from '@/assets/hero.jpg';
import logo1 from '@/assets/logo1.png';
import { ButtonForLogin, InputForLogin } from '@/components';
import { AppDispatch } from '@/redux';
import * as actions from '@/stores/actions';
import { RootState } from '@/stores/reducers/rootReducer';
import { path } from '@/utils/constant';
import { PayloadForLogin } from '@/utils/type';
import validate from '@/utils/validateField';

interface InvalidField {
	name: string;
	msg: string;
}

const LoginUser: React.FC = () => {
	const { isLogin } = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [payload, setPayload] = useState<PayloadForLogin>({
		email: '',
		password: '',
	});
	const [invalidField, setInvalidField] = useState<InvalidField[]>([]);
	useEffect(() => {
		if (isLogin) {
			navigate('/');
		}
	}, [isLogin]);
	const handleSubmit = async () => {
		const invalid = validate(payload, setInvalidField);
		if (invalid === 0) {
			dispatch(actions.login(payload));
			dispatch(actions.getUser(payload.email));
		}
	};

	return (
		<section className="gradient-form h-screen bg-neutral-200 light:bg-neutral-700 flex items-center justify-center">
			<div className="container max-w-4xl">
				<div className="flex flex-wrap items-center justify-center text-neutral-950 ">
					<div className="w-50">
						<div className="block rounded-lg bg-white shadow-lg light:bg-neutral-800">
							<div className="g-0 lg:flex lg:flex-wrap">
								{/* Cột Trái */}
								<div className="flex items-center justify-center rounded-b-lg lg:w-4/6 lg:rounded-e-lg lg:rounded-bl-none">
									<div className="h-100 relative">
										<img
											src={hero}
											alt="Về Evora"
											className="w-full h-full rounded-lg shadow-lg"
										/>
									</div>
								</div>

								{/* Cột Phải */}
								<div className="px-6 py-8 md:px-8 lg:w-2/6">
									<div className="text-center">
										<img className="mx-auto w-20" src={logo1} alt="logo" />
										<h4 className="mb-6 mt-4 text-xl font-semibold text-neutral-950">
											Đăng nhập cho người dùng
										</h4>
									</div>

									{/* Trường Tên Đăng Nhập và Mật Khẩu */}
									<InputForLogin
										id="email"
										label="Email"
										type="text"
										invalidField={invalidField}
										value={payload.email}
										setValue={setPayload}
										setInvalidField={setInvalidField}
									/>

									<InputForLogin
										id="password"
										label="Mật khẩu"
										type="password"
										invalidField={invalidField}
										value={payload.password}
										setValue={setPayload}
										setInvalidField={setInvalidField}
									/>
									{/* Nút Đăng Nhập */}
									<div className="my-6 text-center">
										<ButtonForLogin label="Đăng nhập" onClick={handleSubmit} />
										<NavLink
											to={path.FORGOT_PASSWORD}
											className="my-2 inline-block text-xm text-primary text-gray-900"
										>
											Quên mật khẩu?
										</NavLink>
									</div>

									{/* Phần Đăng Ký */}
									<div className="flex items-center justify-between">
										<p className="text-sm text-gray-900">Chưa có tài khoản?</p>
										<NavLink
											to={path.REGISTER_USER}
											className="rounded border border-red-500 font-bold px-4 py-2 text-sm text-red-500 hover:bg-red-50"
										>
											Đăng ký ngay
										</NavLink>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginUser;
