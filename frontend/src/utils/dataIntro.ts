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
	title: 'Tại sao chọn Evora để đăng ký sự kiện?',
	description:
		'Chúng tôi hiểu rằng bạn có rất nhiều lựa chọn khác nhau, nhưng Evora tự hào là nền tảng dẫn đầu trên Google trong các tìm kiếm về sự kiện và dịch vụ tổ chức sự kiện: ',
	description2:
		'Vì vậy, khi đăng tin trên Evora, bạn sẽ tiếp cận được một lượng khách hàng lớn hơn, giúp việc giao dịch trở nên nhanh chóng và tiết kiệm chi phí hơn.',
	statistic: [
		{
			name: 'Thành viên đã đăng ký',
			value: '116.998+',
		},
		{
			name: 'Sự kiện đã được đăng',
			value: '103.348+',
		},
		{
			name: 'Lượt truy cập/tháng',
			value: '300.000+',
		},
		{
			name: 'Lượt xem tin/tháng',
			value: '2.500.000+',
		},
	],
	price: 'Chi phí hợp lý, hiệu quả cao',
	comment:
		'"Trước khi biết đến Evora, mình phải tốn nhiều thời gian và chi phí cho việc quảng bá sự kiện: từ in ấn tờ rơi, dán poster, cho đến đăng tin trên các trang web khác nhưng không đạt hiệu quả cao. Sau khi thử đăng tin trên Evora, mình đã nhận thấy sự thay đổi rõ rệt về hiệu quả, trong khi chi phí lại rất hợp lý."',
	author: 'Anh Vĩ (Chủ hệ thống nhà hàng, khách sạn)',
	question: 'Bạn có sự kiện cần tổ chức hoặc dịch vụ cần quảng bá?',
	answer:
		'Đừng lo, Evora giúp bạn kết nối với người cho thuê dịch vụ ngay lập tức.',
};
