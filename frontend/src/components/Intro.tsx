import { text } from '../ultils/dataIntro';
import icons from '../ultils/icons';
import React, { memo } from 'react';

const { FaStar } = icons;
const stars = [1, 2, 3, 4, 5];

interface Statistic {
	value: string;
	name: string;
}

const Intro: React.FC = () => {
	return (
		<div className="w-4/5  bg-[#FAF3EB] rounded-md p-4 gap-4 shadow-md flex flex-col justify-center items-center">
			<h3 className="font-bold text-lg">{text.title}</h3>
			<p className="text-gray-800 text-center my-4 text-sm">
				{text.description}
				<span></span>
				{text.description2}
			</p>
			<div className="flex items-center justify-around w-full">
				{text.statistic.map((item: Statistic, index: number) => {
					return (
						<div
							key={index}
							className="flex flex-col justify-center items-center"
						>
							<h4 className="font-bold text-lg">{item.value}</h4>
							<p className="text-gray-700">{item.name}</p>
						</div>
					);
				})}
			</div>
			<h3 className="font-bold text-lg py-2">{text.price}</h3>
			<div className="flex items-center justify-center gap-1">
				{stars.map((item) => {
					return (
						<span key={item}>
							<FaStar color="yellow" size={22} />
						</span>
					);
				})}
			</div>
			<p className="text-gray-600 italic text-center">{text.comment}</p>
			<span className="text-gray-700">{text.author}</span>
			<h3 className="font-bold text-lg py-2">{text.question}</h3>
			<p className="text-gray-800 text-center text-sm">{text.answer}</p>
			<div className="h-12"></div>
		</div>
	);
};

export default memo(Intro);
