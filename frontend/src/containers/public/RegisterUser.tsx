import React from 'react';
import { NavLink } from 'react-router-dom';

import logo1 from '@/assets/logo1.png';
import { path } from '@/ultils/constant';

const RegisterUser: React.FC = () => {
	return (
		<section className="gradient-form h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
			<div className="container max-w-5xl p-6">
				<div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
					<div className="text-center py-8">
						<img className="mx-auto w-36" src={logo1} alt="logo" />
						<h4 className="mt-4 text-xl font-semibold">
							Register for a New Account
						</h4>
					</div>

					<div className="lg:flex lg:justify-between px-6">
						{/* Left Column */}
						<div className="lg:w-6/12 lg:pr-3">
							{/* Full Name Input */}
							<div className="relative mb-6">
								<input
									type="text"
									id="fullName"
									className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
								/>
								<label
									htmlFor="fullName"
									className="absolute left-3 top-[-10px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
								>
									Full Name
								</label>
							</div>

							{/* Email Input */}
							<div className="relative mb-6">
								<input
									type="email"
									id="email"
									className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
								/>
								<label
									htmlFor="email"
									className="absolute left-3 top-[-10px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
								>
									Email
								</label>
							</div>

							{/* Phone Number Input */}
							<div className="relative mb-6">
								<input
									type="tel"
									id="phoneNumber"
									className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
								/>
								<label
									htmlFor="phoneNumber"
									className="absolute left-3 top-[-10px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
								>
									Phone Number
								</label>
							</div>

							{/* Date of Birth Input */}
							<div className="relative mb-6">
								<input
									type="date"
									id="dateOfBirth"
									className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
								/>
								<label
									htmlFor="dateOfBirth"
									className="absolute left-3 top-[-10px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
								>
									Date of Birth
								</label>
							</div>
						</div>

						{/* Right Column */}
						<div className="lg:w-6/12 lg:pl-3">
							{/* Address Input */}
							<div className="relative mb-6">
								<input
									type="text"
									id="address"
									className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
								/>
								<label
									htmlFor="address"
									className="absolute left-3 top-[-10px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
								>
									Address
								</label>
							</div>

							{/* Gender Dropdown */}
							<div className="relative mb-6">
								<select
									id="gender"
									className="peer block w-full appearance-none rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:bg-neutral-800 dark:placeholder:text-neutral-300"
								>
									<option value="" disabled hidden>
										Select Gender
									</option>
									<option value="male">Nam</option>
									<option value="female">Nữ</option>
								</select>
								<label
									htmlFor="gender"
									className="absolute left-3 top-[-10px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary"
								>
									Gender
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
									className="absolute left-3 top-[-10px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
								>
									Password
								</label>
							</div>

							{/* Confirm Password Input */}
							<div className="relative mb-6">
								<input
									type="password"
									id="confirmPassword"
									className="peer block w-full rounded bg-transparent px-3 py-2.5 leading-6 border-b border-gray-300 outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-neutral-300"
								/>
								<label
									htmlFor="confirmPassword"
									className="absolute left-3 top-[-10px] text-neutral-500 transition-all duration-200 dark:text-neutral-400 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
								>
									Confirm Password
								</label>
							</div>
						</div>
					</div>

					<div className="text-center py-6">
						<button
							type="button"
							className="w-[50%] rounded bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-700 px-6 py-2.5 text-lg font-medium text-white shadow-lg transition duration-150 ease-in-out hover:shadow-xl"
						>
							Register
						</button>

						<div className="mt-4 flex items-center justify-center gap-2">
							<p className="text-sm">Already have an account?</p>
							<NavLink
								to={path.LOGIN_USER}
								className="mt-2 rounded border border-blue-500 px-4 py-2 text-sm text-blue-500 hover:bg-blue-50"
							>
								Log in
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterUser;
