import React from 'react';

import { List } from '@/components';

const HomePage: React.FC = () => {
	return (
		<div className=" w-full flex flex-col gap-3">
			<div className="w-full flex gap-4">
				<div className="w-full">
					<List />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
