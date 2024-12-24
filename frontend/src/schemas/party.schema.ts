import { User } from '@/schemas/user.schema';

export interface Party {
	_id: string;
	user: User;
	category: string;
	title: string;
	description: string;
	options: 'tiệc cưới' | 'sinh nhật' | 'thôi nôi' | 'khai trương';
	photos: string[];
	ratingTotal: number;
	ratingCount: number;
	createdAt?: Date;
	updatedAt?: Date;
}
