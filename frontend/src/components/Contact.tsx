import { text } from '../ultils/dataContact';
import React from 'react';

interface Contact {
	text: string;
	phone: string;
	zalo: string;
}

const Contacts: React.FC = () => {
	return (
		<div className=" bg-[#FAF3EB] rounded-md shadow-md p-4 w-4/5 flex flex-col justify-center items-center gap-6">
			<img
				className="w-full h-48 object-contain"
				src={text.image}
				alt="thumbnail"
			/>
			<p className="">{text.content}</p>
			<div className="flex items-center justify-around w-full">
				{text.contact.map((item: Contact) => {
					return (
						<div
							key={item.text}
							className="flex flex-col items-center justify-center"
						>
							<span className="text-orange-600 text-[15px] font-bold ">
								{item.text}
							</span>
							<span className="text-blue-900 text-[15px] font-bold">
								{item.phone}
							</span>
							<span className="text-blue-900 text-[15px] font-bold">
								{item.zalo}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Contacts;
