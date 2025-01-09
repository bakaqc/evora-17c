import { NavLink } from 'react-router-dom';

import { path } from '@/utils/constant';

const RegisterSection = () => (
	<div className="flex items-center justify-between">
		<p className="text-sm">Don't have an account?</p>
		<NavLink
			to={path.REGISTER_USER}
			className="rounded border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
		>
			Register
		</NavLink>
	</div>
);

export default RegisterSection;
