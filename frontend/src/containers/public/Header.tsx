import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo1 from '@/assets/logo1.png';
import { Button } from '@/components';
import icons from '@/utils/icons';

const { CiLogin, RiAdminLine, RiUserLine } = icons;

const Header: React.FC = () => {
	const [isShowMenu, setIsShowMenu] = useState(false);

	return (
		<div className="w-full flex items-center justify-between bg-[#FAF3EB]">
			<img
				src={logo1}
				alt="logo"
				className="w-[240px] h-[70px] object-contain"
			/>
			<div className="flex items-center gap-4 mr-4 relative">
				<Button
					text={'Đăng Nhập '}
					textColor={'text-white'}
					bgColor="bg-[#E88F2A]"
					IcBefor={CiLogin}
					onClick={() => {
						setIsShowMenu((prev) => !prev);
					}}
				/>
				{isShowMenu && (
					<div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md p-4 w-[300px] flex flex-col z-50">
						<Link
							className="hover:text-orange-500 border-y border-gray-200 py-2 flex items-center gap-2 whitespace-nowrap"
							to={'user/login'}
						>
							<RiUserLine />
							Đăng nhập cho người dùng
						</Link>
						<Link
							className="hover:text-orange-500 border-y border-gray-200 py-2 flex items-center gap-2 whitespace-nowrap"
							to={'admin/login'}
						>
							<RiAdminLine />
							Đăng nhập cho admin
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
