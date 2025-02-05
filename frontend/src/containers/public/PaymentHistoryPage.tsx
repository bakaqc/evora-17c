import React from 'react';

import { TopBar } from '@/components';
import PaymentHistory from '@/components/PaymentHistory';
import Footer from '@/containers/public/Footer';
import Navigation from '@/containers/public/Navigation';

const PaymentHistoryPage: React.FC = () => {
	return (
		<div>
			<TopBar />
			<Navigation />
			<div className=" w-full flex flex-col gap-3 py-3">
				<div className="w-4/5 lg:w-5/5 flex flex-col items-center justify-center text-center mx-auto">
					<PaymentHistory />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PaymentHistoryPage;
