import React, { memo } from 'react';
import Slider from 'react-slick';

const settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
};

interface SliderCustomProps {
	images: string[];
}

const SliderCustom: React.FC<SliderCustomProps> = ({ images }) => {
	return (
		<div className="w-full">
			<Slider {...settings}>
				{images.length > 0 &&
					images.map((item, index) => (
						<div key={index} className="bg-black flex justify-center h-[320px]">
							<img
								src={item}
								alt="slider"
								className="w-full h-full object-contain m-auto"
							/>
						</div>
					))}
			</Slider>
		</div>
	);
};

export default memo(SliderCustom);
