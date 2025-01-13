interface LoginOption {
	id: number;
	text: string;
	path: string;
}

// Khai báo loginManage với kiểu dữ liệu rõ ràng
const loginManage: LoginOption[] = [
	{
		id: 1,
		text: 'Đăng nhập cho người dùng',
		path: '/user/login',
	},
	{
		id: 2,
		text: 'Đăng nhập cho admin',
		path: '/admin/login',
	},
];

export default loginManage;
