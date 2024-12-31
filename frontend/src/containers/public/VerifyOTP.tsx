import React from 'react';
import { NavLink } from 'react-router-dom';

import logo1 from '@/assets/logo1.png';
import { ButtonForLogin, InputField } from '@/components';
import { path } from '@/ultils/constant';

const VerifyOTP: React.FC = () => {
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
											Verify Your OTP
										</h4>
									</div>
									<InputField id="otp" label="OTP" type="text" />

									{/* Verify Button */}
									<div className="mb-6 text-center">
										<ButtonForLogin label="Verify OTP" />
										<a
											href="#!"
											className="mt-2 inline-block text-sm text-primary"
										>
											Resend OTP
										</a>
									</div>

									{/* Login Section */}
									<div className="flex items-center justify-between">
										<p className="text-sm">Back to Login?</p>
										<NavLink
											to={path.LOGIN_USER}
											className="rounded border border-blue-500 px-4 py-2 text-sm text-blue-500 hover:bg-blue-50"
										>
											Log in
										</NavLink>
									</div>
								</div>

								{/* Right Column */}
								<div className="flex items-center justify-center rounded-b-lg bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-700 lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none">
									<div className="px-6 py-8 text-white md:px-8">
										<h4 className="mb-6 text-xl font-semibold">
											Secure Your Account
										</h4>
										<p className="text-sm">
											To ensure your account's security, please verify the OTP
											sent to your email.
										</p>
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

export default VerifyOTP;
