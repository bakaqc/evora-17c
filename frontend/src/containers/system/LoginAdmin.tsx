/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import hero from '@/assets/hero.jpg';
import logo1 from '@/assets/logo1.png';
import { ButtonForLogin, InputForLogin } from '@/components';
import { AppDispatch } from '@/redux';
import * as actions from '@/stores/actions';
import { RootState } from '@/stores/reducers/rootReducer';
import { PayloadForLogin } from '@/utils/type';
import validate from '@/utils/validateField';

interface InvalidField {
	name: string;
	msg: string;
}

const LoginAdmin: React.FC = () => {
	const { isLoginAdmin } = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [payload, setPayload] = useState<PayloadForLogin>({
		email: '',
		password: '',
	});
	const [invalidField, setInvalidField] = useState<InvalidField[]>([]);

	useEffect(() => {
		if (isLoginAdmin) {
			navigate('/quan-tri-vien');
		}
	}, [isLoginAdmin]);

	const handleSubmit = async () => {
		const invalid = validate(payload, setInvalidField);
		if (invalid === 0) {
			dispatch(actions.loginAdmin(payload));
		}
	};

	return (
		<section className="gradient-form h-screen bg-neutral-200 dark:bg-neutral-100 flex items-center justify-center">
			<div className="container max-w-4xl">
				<div className="flex flex-wrap items-center justify-center text-neutral-950">
					<div className="w-50">
						<div className="block rounded-lg bg-white shadow-lg">
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
											Đăng nhập cho quản trị viên
										</h4>
									</div>

									{/* Trường Email và Mật khẩu */}
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
									{/* Nút Đăng nhập */}
									<div className="my-6 text-center">
										<ButtonForLogin label="Đăng nhập" onClick={handleSubmit} />
										<a
											href="#!"
											className="my-2 inline-block text-xm text-primary text-gray-900"
										>
											Quên mật khẩu?
										</a>
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

export default LoginAdmin;
