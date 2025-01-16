import React from 'react';
import { useParams } from 'react-router-dom';

import { TopBar } from '@/components';
import PartyDetail from '@/components/PartyDetail';
import { Footer, Navigation } from '@/containers/public';

const PartyDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>() || { id: '' };

	return (
		<div>
			<TopBar />
			<Navigation />
			<PartyDetail id={id} />
			<Footer />
		</div>
	);
};

export default PartyDetailPage;
