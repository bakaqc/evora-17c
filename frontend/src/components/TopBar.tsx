import React from 'react';

import icons from '@/utils/icons';

const { FaBirthdayCake, BiPhoneCall, BiEnvelope } = icons;

const TopBar: React.FC = () => {
	return (
		<div className="container-fluid px-0 hidden lg:block bg-[#FAF3EB]">
			<div className="flex flex-wrap">
				{/* Email Section */}
				<div className="w-full lg:w-1/3 text-center py-3">
					<div className="flex items-center justify-center">
						<BiEnvelope className="text-4xl text-[#E88F2A] mr-3" />
						<div className="text-left">
							<h6 className="uppercase text-black font-semibold">Email Us</h6>
							<span className="text-gray-700">evora.17c@gmail.com</span>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-1/3 text-center py-3 bg-[#E88F2A] flex justify-center items-center">
					<div className="p-1 pl-[150px] pr-[150px] border-2 border-white">
						<div className="flex justify-center items-center">
							<FaBirthdayCake className="text-4xl text-black mr-2" />
							<h1 className="text-4xl uppercase text-white font-bold">Evora</h1>
						</div>
					</div>
				</div>

				{/* Contact Section */}
				<div className="w-full lg:w-1/3 text-center py-3">
					<div className="flex items-center justify-center">
						<BiPhoneCall className="text-4xl text-[#E88F2A] mr-3" />
						<div className="text-left">
							<h6 className="uppercase text-black font-semibold">Liên hệ</h6>
							<span className="text-gray-700">038 389 8281</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopBar;
