import { useSelector } from 'react-redux';

import { RootState } from '@/stores/reducers/rootReducer';

const Navbar = () => {
	const { user } = useSelector((state: RootState) => state.user);
	console.log('navbar:', user);
	return (
		<div className="flex items-center justify-between p-4">
			{/* SEARCH BAR */}
			<div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
				<input
					type="text"
					placeholder="Search..."
					className="w-[200px] p-2 bg-transparent outline-none"
				/>
			</div>

			{/* ICONS AND USER */}
			<div className="flex items-center gap-6 justify-end w-full">
				{/* User Info */}
				<div className="flex flex-col">
					<span className="text-xs leading-3 font-medium">{user.fullName}</span>
					<span className="text-[10px] text-gray-500 text-right">
						{user.role}
					</span>
				</div>

				{/* User Avatar */}
				<img
					src={user?.avatar}
					alt="Avatar"
					width={36}
					height={36}
					className="rounded-full"
				/>
			</div>
		</div>
	);
};

export default Navbar;
