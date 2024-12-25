import { User } from '@/schemas/user.schema';

export interface Party {
	_id: string;
	user: User;
	category: 'Sinh nhật' | 'Đám cưới' | 'Khai trương' | 'Thôi nôi';
	title: string;
	description: string;
	options: string[];
	photos: string[];
	ratingTotal: number;
	ratingCount: number;
	createdAt?: Date;
	updatedAt?: Date;
}
