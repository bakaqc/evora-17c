import React from 'react';

import logo1 from '@/assets/logo1.png';
import { ButtonForLogin, InputField } from '@/components';

const LoginAdmin: React.FC = () => {
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
									<InputField id="username" label="Email" type="text" />
									<InputField id="password" label="Password" type="password" />

									{/* Login ButtonForLogin */}
									<div className="mb-6 text-center">
										<ButtonForLogin label="Log in" />
										<a
											href="#!"
											className="mt-2 inline-block text-sm text-primary"
										>
											Forgot password?
										</a>
									</div>
								</div>

								{/* Right Column */}
								<div className="flex items-center justify-center rounded-b-lg bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-700 lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none">
									<div className="px-6 py-8 text-white md:px-8">
										<h4 className="mb-6 text-xl font-semibold">
											We are more than just a company
										</h4>
										<p className="text-sm">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Ut enim ad minim veniam, quis nostrud exercitation
											ullamco laboris nisi ut aliquip ex ea commodo consequat.
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

export default LoginAdmin;
