import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { RootState } from '@/stores/reducers/rootReducer';
import { path } from '@/ultils/constant';
import icons from '@/ultils/icons';

const { RiAdminLine, RiUserLine, IoIosLogOut } = icons;

interface NavigationProps {
	isAdmin?: boolean;
}

const notActive =
	'hover:bg-amber-600 px-4 h-full flex items-center bg-[#2B2825]';
const active = 'hover:bg-amber-600 px-4 h-full flex items-center bg-[#2B2825]';

const Navigation: React.FC<NavigationProps> = ({ isAdmin = false }) => {
	const [isShowMenu, setIsShowMenu] = useState(false);
	const [isShowUserDropdown, setIsShowUserDropdown] = useState(false);
	const { isLogin } = useSelector((state: RootState) => state.auth);
	return (
		<div
			className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center h-[60px] bg-[#2B2825] text-white`}
		>
			<div className="w-full flex h-full justify-center items-center text-sm font-bold space-x-4 flex-nowrap">
				<NavLink
					to={`/`}
					className={({ isActive }) => (isActive ? active : notActive)}
				>
					TRANG CHỦ
				</NavLink>
				<NavLink
					to={path.BIRTHDAY}
					className={({ isActive }) => (isActive ? active : notActive)}
				>
					SINH NHẬT
				</NavLink>
				<NavLink
					to={path.F_BIRTHDAY}
					className={({ isActive }) => (isActive ? active : notActive)}
				>
					THÔI NÔI
				</NavLink>
				<NavLink
					to={path.OPENING}
					className={({ isActive }) => (isActive ? active : notActive)}
				>
					KHAI TRƯƠNG
				</NavLink>
				<NavLink
					to={path.WEDDING}
					className={({ isActive }) => (isActive ? active : notActive)}
				>
					ĐÁM CƯỚI
				</NavLink>
				<NavLink
					to={path.INTRO}
					className={({ isActive }) => (isActive ? active : notActive)}
				>
					GIỚI THIỆU
				</NavLink>
				{!isLogin && (
					<div className="relative h-full">
						<button
							onClick={() => setIsShowMenu(!isShowMenu)}
							className="hover:bg-amber-600 px-4 py-2 flex items-center w-full h-full"
						>
							ĐĂNG NHẬP
						</button>
						{isShowMenu && (
							<div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md p-4 w-[300px] flex flex-col z-50">
								<Link
									className="hover:text-orange-500 border-y border-gray-200 py-2 flex items-center gap-2 whitespace-nowrap text-slate-950"
									to={'/user/login'}
								>
									<RiUserLine />
									Đăng nhập cho người dùng
								</Link>
								<Link
									className="hover:text-orange-500 border-y border-gray-200 py-2 flex items-center gap-2 whitespace-nowrap text-slate-950"
									to={'/admin/login'}
								>
									<RiAdminLine />
									Đăng nhập cho admin
								</Link>
							</div>
						)}
					</div>
				)}
				{isLogin && (
					<div className="relative h-full">
						<button
							onClick={() => setIsShowUserDropdown(!isShowUserDropdown)}
							className="hover:bg-amber-600 px-4 py-2 flex items-center w-full h-full"
						>
							Hi <span>User</span>
						</button>
						{isShowUserDropdown && (
							<div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md p-4 w-[300px] flex flex-col z-50">
								<Link
									className="hover:text-orange-500 border-y border-gray-200 py-2 flex items-center gap-2 whitespace-nowrap text-slate-950"
									to={'/user/login'}
								>
									<IoIosLogOut />
									Đăng xuất
								</Link>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Navigation;
