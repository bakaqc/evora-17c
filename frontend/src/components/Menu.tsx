// Sử dụng react-router-dom thay cho next/link
import { FC } from 'react';
import { Link } from 'react-router-dom';

import booking from '@/assets/booking.png';
import homeIcon from '@/assets/home.png';
import logout from '@/assets/logout.png';
import notify from '@/assets/notify.png';
import party from '@/assets/party.png';
import payment from '@/assets/payment.png';
import profile from '@/assets/profile.png';
import setting from '@/assets/setting.png';
import userIcon from '@/assets/user.png';
import voucher from '@/assets/voucher.png';
import { path } from '@/utils/constant';

const menuItems = [
	{
		title: 'MENU',
		items: [
			{
				icon: homeIcon,
				label: 'Home',
				path: '/quan-tri-vien',
			},
			{
				icon: userIcon,
				label: 'User',
				path: '/quan-tri-vien/danh-sach-nguoi-dung',
			},
			{
				icon: booking,
				label: 'Booking',
				path: '/quan-tri-vien/danh-sach-dat-tiec',
			},
			{
				icon: party,
				label: 'Party',
				path: '/quan-tri-vien/danh-sach-bua-tiec',
			},
			{
				icon: voucher,
				label: 'Vouchers',
				path: '/quan-tri-vien/danh-sach-ma-giam-gia',
			},
			{
				icon: payment,
				label: 'Payments',
				path: '/quan-tri-vien/danh-sach-thanh-toan',
			},
			{
				icon: notify,
				label: 'Notifies',
				path: '/quan-tri-vien/thong-bao',
			},
		],
	},
	{
		title: 'OTHER',
		items: [
			{
				icon: profile,
				label: 'Profile',
				path: path.PROFILE,
			},
			{
				icon: setting,
				label: 'Settings',
				path: path.SETTING,
			},
			{
				icon: logout,
				label: 'Logout',
				path: path.LOGOUT,
			},
		],
	},
];

const Menu: FC = () => {
	return (
		<div className="mt-4 text-sm">
			{menuItems.map((i) => (
				<div className="flex flex-col gap-2" key={i.title}>
					<span className="hidden lg:block text-gray-400 font-light my-4">
						{i.title}
					</span>
					{i.items.map((item) => (
						<Link
							to={item.path} // Sử dụng "to" thay vì "href"
							key={item.label}
							className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
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
