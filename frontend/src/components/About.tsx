import React from 'react';
import {
	FaAward,
	FaCheck,
	FaCoffee,
	FaHeartbeat,
	FaUsers,
} from 'react-icons/fa';

import about_banner from '@/assets/about_banner.jpg';

const About: React.FC = () => {
	return (
		<div>
			<div className="container mx-auto px-4 pt-10">
				<div className="text-center mx-auto mb-10 max-w-xl">
					<h1 className="text-4xl font-bold uppercase text-[#E88F2A]">
						Chào mừng bạn đến với Evora
					</h1>
				</div>
				<div className="grid md:grid-cols-2 gap-10 mb-5">
					<div className="h-100 relative">
						<img
							src={about_banner}
							alt="About Evora"
							className="w-full h-full rounded-lg shadow-lg"
						/>
					</div>
					<div>
						<h4 className="mb-1 text-xl font-semibold">
							Evora - Nền tảng kết nối và đặt chỗ sự kiện trực tuyến nhanh
							chóng, tiện lợi.
						</h4>
						<p className="mb-6 text-gray-700">
							Website giúp khách hàng tìm kiếm và kết nối nhanh chóng với các
							đơn vị tổ chức sự kiện thông qua hình thức đặt chỗ trực tuyến. Với
							Evora, người dùng dễ dàng truy cập thông tin chi tiết về từng đơn
							vị tổ chức, bao gồm tên, hình ảnh, số hotline, đánh giá từ khách
							hàng và các mức giá dịch vụ. Người dùng có thể so sánh các lựa
							chọn, đảm bảo dịch vụ chất lượng phù hợp với nhu cầu. Được thiết
							kế dành riêng cho thế hệ Gen Z, Evora mang lại sự tiện lợi, tốc độ
							và trải nghiệm công nghệ tối ưu.
						</p>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="text-center">
								<div className="w-24 h-24 mx-auto bg-primary text-white rounded-full flex items-center justify-center mb-4">
									<FaHeartbeat className="text-4xl text-[#E88F2A]" />
								</div>
								<h4 className="text-lg font-semibold uppercase">Nhanh chóng</h4>
								<p className="text-gray-700">
									Evora cung cấp giao diện thân thiện và dễ sử dụng, cho phép
									khách hàng nhanh chóng tìm kiếm, so sánh và đặt chỗ các đơn vị
									tổ chức sự kiện chỉ với vài bước đơn giản.
								</p>
							</div>
							<div className="text-center">
								<div className="w-24 h-24 mx-auto bg-primary text-white rounded-full flex items-center justify-center mb-4">
									<FaAward className="text-4xl text-[#E88F2A]" />
								</div>
								<h4 className="text-lg font-semibold uppercase">Uy tín</h4>
								<p className="text-gray-700">
									Evora hợp tác với các đơn vị tổ chức sự kiện uy tín, được đánh
									giá cao bởi cộng đồng người dùng giúp đảm bảo tính minh bạch
									và độ tin cậy của dịch vụ.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gray-800 text-white py-10 rounded-lg mx-4">
				<div className="container mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
					<div>
						<div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4">
							<FaUsers className="text-2xl text-[#E88F2A]" />
						</div>
						<h6 className="text-primary uppercase">Đơn vị tổ chức</h6>
						<h1 className="text-3xl font-bold">12345</h1>
					</div>
					<div>
						<div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4">
							<FaCheck className="text-2xl text-[#E88F2A]" />
						</div>
						<h6 className="text-primary uppercase">Sự kiện hoàn thành</h6>
						<h1 className="text-3xl font-bold">12345</h1>
					</div>
					<div>
						<div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4">
							<FaCoffee className="text-2xl text-[#E88F2A]" />
						</div>
						<h6 className="text-primary uppercase">Khách hàng sử dụng</h6>
						<h1 className="text-3xl font-bold">12345</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
