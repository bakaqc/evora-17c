import React from 'react';
import { NavLink } from 'react-router-dom';

import logo1 from '@/assets/logo1.png';
import { path } from '@/ultils/constant';

const LoginUser: React.FC = () => {
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
											Login for User!
										</h4>
									</div>
									{/* Username Input */}
									<div className="relative mb-6">
										<input
											type="text"
											id="username"
											className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
										/>
										<label
											htmlFor="username"
											className="absolute left-3 top-0 text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
										>
											Email
										</label>
									</div>

									{/* Password Input */}
									<div className="relative mb-6">
										<input
											type="password"
											id="password"
											className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
										/>
										<label
											htmlFor="password"
											className="absolute left-3 top-0 text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
										>
											Password
										</label>
									</div>

									{/* Login Button */}
									<div className="mb-6 text-center">
										<button
											type="button"
											className="w-full rounded bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-700 px-6 py-2.5 text-lg font-medium text-white shadow-lg transition duration-150 ease-in-out hover:shadow-xl"
										>
											Log in
										</button>
										<a
											href="#!"
											className="mt-2 inline-block text-sm text-primary"
										>
											Forgot password?
										</a>
									</div>

									{/* Register Section */}
									<div className="flex items-center justify-between">
										<p className="text-sm">Don't have an account?</p>
										<NavLink
											to={path.REGISTER_USER}
											className="rounded border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
										>
											Register
										</NavLink>
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

export default LoginUser;
