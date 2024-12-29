import React from 'react';
import { Outlet } from 'react-router-dom';

import { Banner, Contact, Intro, TopBar } from '@/components';
import { Footer, Navigation } from '@/containers/public';

const Home: React.FC = () => {
	return (
		<div>
			<TopBar />
			<Navigation />
			<Banner />
			<div className="w-full flex flex-col items-center m-auto h-full gap-4">
				<div className="w-4/5 lg:w-5/5 flex flex-col items-start justify-start">
					<Outlet />
				</div>
				<Intro />
				<Contact />
			</div>
			<Footer />
			<div className="h-[500px]"></div>
		</div>
	);
};

export default Home;
