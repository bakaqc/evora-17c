import React from 'react';

import bg from '@/assets/bg.jpg';
// Đảm bảo đường dẫn chính xác
import icons from '@/ultils/icons';

const {
	FaBirthdayCake,
	CiLocationOn,
	IoMailOpenOutline,
	CiPhone,
	FaArrowRightLong,
} = icons;

const Footer: React.FC = () => {
	return (
		<footer className="relative w-full h-[400px]">
			<img
				src={bg}
				alt="Background Footer"
				className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
			/>
			<div className="relative z-10 container px-4 py-6 w-full h-full">
				<div className="flex flex-col md:flex-row gap-[100px] items-start h-full w-full">
					{/* Phần Evora */}
					<div className="relative z-10 w-full lg:w-[350px] h-[350px] text-center py-3 bg-[#E88F2A] flex justify-center items-center mb-6">
						<div className="p-3 pl-[70px] pr-[70px] pt-[140px] pb-[140px] border-2 border-white">
							<div className="flex justify-center items-center">
								<FaBirthdayCake className="text-4xl text-black mr-2" />
								<h1 className="text-4xl uppercase text-white font-bold">
									Evora
								</h1>
							</div>
						</div>
					</div>

					{/* Phần liên kết */}
					<div className="flex flex-col md:flex-row justify-between w-4/5 lg:w-[900px] mt-0">
						<div className="mb-4 ">
							<h2 className="mb-2 text-lg font-bold uppercase text-[#E88F2A]">
								Liên hệ ngay
							</h2>
							<ul className="text-gray-200 font-medium">
								<li className="mb-4 flex items-center gap-1">
									<CiLocationOn size={20} color="#E88F2A" />
									Khu đô thị mới, Quy Nhơn
								</li>
								<li className="mb-4 flex items-center gap-1">
									<IoMailOpenOutline size={20} color="#E88F2A" />
									evora.17c@gmail.com
								</li>
								<li className="mb-4 flex items-center gap-1">
									<CiPhone size={20} color="#E88F2A" />
									+012 345 67890
								</li>
							</ul>
						</div>
						<div className="mb-4">
							<h2 className="mb-2 text-lg font-bold uppercase text-[#E88F2A]">
								Liên kết nhanh
							</h2>
							<ul className="text-gray-200 font-medium">
								<li className="mb-4 flex items-center gap-1">
									<FaArrowRightLong size={20} color="#E88F2A" />
									Trang chủ
								</li>
								<li className="mb-4 flex items-center gap-1">
									<FaArrowRightLong size={20} color="#E88F2A" />
									Danh sách dịch vụ
								</li>
								<li className="mb-4 flex items-center gap-1">
									<FaArrowRightLong size={20} color="#E88F2A" />
									Đơn vị tổ chức
								</li>
								<li className="mb-4 flex items-center gap-1">
									<FaArrowRightLong size={20} color="#E88F2A" />
									Giới thiệu
								</li>
								<li className="mb-4 flex items-center gap-1">
									<FaArrowRightLong size={20} color="#E88F2A" />
									Liên hệ
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-2 text-lg font-bold uppercase text-[#E88F2A]">
								Nhận thông báo
							</h2>
							<ul className="text-gray-200">
								<li className="mb-1">Vui lòng gửi thông tin email của</li>
								<li className="mb-1">bạn để nhận thông báo về</li>
								<li className="mb-4">các ưu đãi mới nhất!</li>
								<li>
									<div className="flex">
										<input
											type="text"
											placeholder="Nhập Email"
											className="h-10 border border-gray-300 px-2 focus:outline-none"
										/>
										<button className="h-10 bg-[#E88F2A] text-white px-4 hover:text-slate-950">
											Gửi ngay
										</button>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{/* Footer bottom */}
				<div className="absolute bottom-0 w-full z-0">
					<hr className="w-full my-6 border-gray-200 dark:border-gray-700 " />
					<div className="flex justify-center items-center text-gray-200">
						<span className="text-sm mb-6 ml-[120px]">
							© 2023 Evora. Bản quyền. Được phát triển bởi nhóm Evora
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
