import React from 'react';

import { Banner, TopBar } from '@/components';
import About from '@/components/About';
import Footer from '@/containers/public/Footer';
import Navigation from '@/containers/public/Navigation';

const AboutPage: React.FC = () => {
	return (
		<div>
			<TopBar />
			<Navigation />
			<Banner />
			<div className=" w-full flex flex-col gap-3 py-3">
				<div className="w-4/5 lg:w-5/5 flex flex-col items-center justify-center mx-auto">
					<About />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AboutPage;
