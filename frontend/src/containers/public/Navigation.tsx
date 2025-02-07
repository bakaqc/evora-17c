import React, { useEffect, useState } from 'react';
import { VscHistory } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';

import { AppDispatch } from '@/redux';
import * as actions from '@/stores/actions';
import { RootState } from '@/stores/reducers/rootReducer';
import { path } from '@/utils/constant';
import icons from '@/utils/icons';

const { RiAdminLine, RiUserLine, IoIosLogOut } = icons;

interface NavigationProps {
	isAdmin?: boolean;
}

const notActive =
	'hover:bg-amber-600 px-4 h-full flex items-center bg-[#2B2825]';
const active = 'hover:bg-amber-600 px-4 h-full flex items-center bg-amber-600';
const login =
	'hover:text-orange-500 border-y border-gray-200 py-2 flex items-center gap-2 whitespace-nowrap text-slate-950';
const Navigation: React.FC<NavigationProps> = ({ isAdmin = false }) => {
	const dispatch: AppDispatch = useDispatch();
	const [isShowMenu, setIsShowMenu] = useState(false);
	const [isShowUserDropdown, setIsShowUserDropdown] = useState(false);
	const { isLogin } = useSelector((state: RootState) => state.auth);
	useEffect(() => {
		console.log(isLogin);
	}, [isLogin]);
	const { user } = useSelector((state: RootState) => state.user);
	console.log(user);
	const [searchParams] = useSearchParams();

	// Hàm xử lý khi click vào category
	const handleCategoryClick = (category: string) => {
		const params: [string, string][] = Array.from(searchParams.entries());
		const searchParamsObject: { [key: string]: string[] } = {};

		params.forEach(([key, value]) => {
			if (Object.keys(searchParamsObject).includes(key)) {
				searchParamsObject[key] = [...searchParamsObject[key], value];
			} else {
				searchParamsObject[key] = [value];
			}
		});

		const payload = {
			query: {
				...searchParamsObject,
				limit: 8,
			},
			category,
		};

		dispatch(actions.getPartiesByCategory(payload));
	};

	return (
		<div
			className={`w-full flex ${
				isAdmin ? 'justify-start' : 'justify-center'
			} items-center h-[60px] bg-[#2B2825] text-white`}
		>
			<div className="w-full flex h-full justify-center items-center text-sm font-bold">
				<NavLink
					to={`/`}
					className={({ isActive }) => (isActive ? active : notActive)}
				>
					TRANG CHỦ
				</NavLink>
				<NavLink
					to={path.BIRTHDAY}
					className={({ isActive }) => (isActive ? active : notActive)}
					onClick={() => handleCategoryClick('Sinh nhật')}
				>
					SINH NHẬT
				</NavLink>
				<NavLink
					to={path.F_BIRTHDAY}
					className={({ isActive }) => (isActive ? active : notActive)}
					onClick={() => handleCategoryClick('Thôi nôi')}
				>
					THÔI NÔI
				</NavLink>
				<NavLink
					to={path.OPENING}
					className={({ isActive }) => (isActive ? active : notActive)}
					onClick={() => handleCategoryClick('Khai trương')}
				>
					KHAI TRƯƠNG
				</NavLink>
				<NavLink
					to={path.WEDDING}
					className={({ isActive }) => (isActive ? active : notActive)}
					onClick={() => handleCategoryClick('Đám cưới')}
				>
					ĐÁM CƯỚI
				</NavLink>
				<NavLink
					to={path.INTRO}
					className={({ isActive }) => (isActive ? active : notActive)}
				>
					GIỚI THIỆU
				</NavLink>
				{/* Xử lý phần login/logout */}
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
								<NavLink className={login} to="/dang-nhap">
									<RiUserLine />
									Đăng nhập cho người dùng
								</NavLink>
								<NavLink className={login} to="/quan-tri-vien/dang-nhap">
									<RiAdminLine />
									Đăng nhập cho admin
								</NavLink>
							</div>
						)}
					</div>
				)}
				{isLogin && (
					<div className="relative h-full">
						<button
							onClick={() => setIsShowUserDropdown(!isShowUserDropdown)}
							className="hover:bg-amber-600 px-4 py-2 flex items-center w-full h-full gap-2"
							aria-label="Hiển thị menu người dùng"
						>
							<span>{user.fullName}</span>
							<img
								src={user.avatar}
								className="rounded-full w-[50px]"
								alt="Avatar người dùng"
							/>
						</button>
						{isShowUserDropdown && (
							<div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md p-4 w-auto flex flex-col z-50">
								<NavLink
									className="hover:text-orange-500 border-y border-gray-200 py-2 flex items-center gap-2 whitespace-nowrap text-slate-950"
									to={path.PAYMENT_HISTORY}
								>
									<VscHistory />
									Lịch sử đặt tiệc
								</NavLink>
								<NavLink
									className="hover:text-orange-500 border-y border-gray-200 py-2 flex items-center gap-2 whitespace-nowrap text-slate-950"
									to={'/'}
								>
									<IoIosLogOut />
									Đăng xuất
								</NavLink>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Navigation;
