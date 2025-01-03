interface Statistic {
	value: string;
	name: string;
}

interface Text {
	title: string;
	description: string;
	description2: string;
	statistic: Statistic[];
	price: string;
	comment: string;
	author: string;
	question: string;
	answer: string;
}

export const text: Text = {
	title: 'Tại sao lại chọn Evora?',
	description:
		'Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Evora tự hào là trang web đứng top google về các từ khóa: ',
	description2:
		'...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn',
	statistic: [
		{
			name: 'Thành viên',
			value: '116.998+',
		},
		{
			name: 'Tin đăng',
			value: '103.348+',
		},
		{
			name: 'Lượt truy cập/tháng',
			value: '300.000+',
		},
		{
			name: 'Lượt xem/tháng',
			value: '2.500.000+',
		},
	],
	price: 'Chi phí thấp, hiệu quả tối đa',
	comment:
		'"Trước khi biết website Evora, mình phải tốn nhiều công sức và chi phí cho việc đăng tin dịch vụ, sự kiện: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website Evora, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp."',
	author: 'Anh Vĩ (chủ hệ thống nhà hàng, khách sạn chia sẻ)',
	question: 'Bạn đang có sự kiện, dịch vụ cần đăng tin?',
	answer: 'Không phải lo tìm người cho thuê dịch vụ',
};
