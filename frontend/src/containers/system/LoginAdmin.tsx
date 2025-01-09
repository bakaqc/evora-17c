import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import logo1 from '@/assets/logo1.png';
import { ButtonForLogin } from '@/components';
import LoginInputField from '@/components/commons/LoginInputField';
import RegisterSection from '@/components/commons/RegisterSection';
import RightColumn from '@/components/commons/RightColumn';
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
		if (invalid === 0) dispatch(actions.loginAdmin(payload));
	};

	return (
		<section className="gradient-form h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
			<div className="container max-w-5xl p-6">
				<div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
					<div className="w-full">
						<div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
							<div className="g-0 lg:flex lg:flex-wrap">
								{/* Left Column */}
								<div className="px-6 py-8 md:px-8 lg:w-6/12">
									<div className="text-center">
										<img className="mx-auto w-36" src={logo1} alt="logo" />
										<h4 className="mb-6 mt-4 text-xl font-semibold">
											Login for Admin!
										</h4>
									</div>

									{/* Username and Password Fields */}
									<LoginInputField
										id="email"
										label="Email"
										type="text"
										invalidField={invalidField}
										value={payload.email}
										setValue={(value) =>
											setPayload({ ...payload, email: value })
										}
										setInvalidField={setInvalidField}
									/>

									<LoginInputField
										id="password"
										label="Password"
										type="password"
										invalidField={invalidField}
										value={payload.password}
										setValue={(value) =>
											setPayload({ ...payload, password: value })
										}
										setInvalidField={setInvalidField}
									/>
									{/* Login Button */}
									<div className="mb-6 text-center">
										<ButtonForLogin label="Log in" onClick={handleSubmit} />
										<a
											href="#!"
											className="mt-2 inline-block text-sm text-primary"
										>
											Forgot password?
										</a>
									</div>

									{/* Register Section */}
									<RegisterSection />
								</div>

								{/* Right Column */}
								<RightColumn />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginAdmin;
