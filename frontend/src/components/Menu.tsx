import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import booking from '@/assets/booking.png';
import homeIcon from '@/assets/home.png';
import logout from '@/assets/logout.png';
import party from '@/assets/party.png';
import payment from '@/assets/payment.png';
import profile from '@/assets/profile.png';
import setting from '@/assets/setting.png';
import userIcon from '@/assets/user.png';
import { path } from '@/utils/constant';

const menuItems = [
	{
		title: 'MENU',
		items: [
			{
				icon: homeIcon,
				label: 'Bảng điều khiển',
				path: '/quan-tri-vien',
			},
			{
				icon: userIcon,
				label: 'Người dùng',
				path: '/quan-tri-vien/danh-sach-nguoi-dung',
			},
			{
				icon: booking,
				label: 'Đặt tiệc',
				path: '/quan-tri-vien/danh-sach-dat-tiec',
			},
			{
				icon: party,
				label: 'Bữa tiệc',
				path: '/quan-tri-vien/danh-sach-bua-tiec',
			},
			{
				icon: payment,
				label: 'Thanh toán',
				path: '/quan-tri-vien/danh-sach-thanh-toan',
			},
		],
	},
	{
		title: 'OTHER',
		items: [
			{
				icon: profile,
				label: 'Thông tin cá nhân',
				path: path.PROFILE,
			},
			{
				icon: setting,
				label: 'Cài đặt',
				path: path.SETTING,
			},
			{
				icon: logout,
				label: 'Đăng xuất',
				path: path.LOGOUT,
			},
		],
	},
];

const Menu: FC = () => {
	const location = useLocation();

	return (
		<div className="mt-4 text-sm">
			{menuItems.map((i) => (
				<div className="flex flex-col gap-2" key={i.title}>
					<span className="hidden lg:block text-gray-400 font-light my-4">
						{i.title}
					</span>
					{i.items.map((item) => (
						<Link
							to={item.path}
							key={item.label}
							className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight ${
								location.pathname === item.path ? 'bg-orange-300' : ''
							}`}
						>
							<img src={item.icon} alt={item.label} width={20} height={20} />
							<span className="hidden lg:block">{item.label}</span>
						</Link>
					))}
				</div>
			))}
		</div>
	);
};

export default Menu;
