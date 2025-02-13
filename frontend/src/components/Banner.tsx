import React from 'react';
import { NavLink } from 'react-router-dom';

import hero from '@/assets/hero.jpg';
import { path } from '@/utils/constant';

const Banner: React.FC = () => {
	return (
		<div className="relative w-full h-[500px] mb-3">
			<img
				src={hero}
				alt="Hero Image"
				className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
			/>
			<div className="relative z-10 container mx-auto px-4 py-5 h-[500px]">
				<div className="flex justify-start items-center h-full">
					<div className="lg:w-2/3 text-center lg:text-left">
						<h1 className="font-serif text-[#E88F2A] mb-1.5 text-[35px] font-semibold">
							Nơi gắn kết sự kiện và trải nghiệm của bạn!
						</h1>
						<h1 className="font-sans text-[70px] font-bold text-white mb-4">
							EVORA
						</h1>
						<h1 className="font-mono text-[40px] font-bold text-white text-xl mb-7">
							ĐẶT SỰ KIỆN TRỰC TUYẾN
						</h1>
						<div className="w-full lg:w-[200px] lg:h-[70px] text-center py-3 bg-[#E88F2A] flex justify-center items-center font-bold text-white">
							<div className="p-3 pl-[50px] pr-[50px] border-2 border-white">
								<div className="flex justify-center items-center">
									<NavLink to={path.INTRO}>Xem thêm</NavLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
