import { User } from '@/schemas/user.schema';

export interface Notification {
	_id: string;
	user: User;
	title: string;
	message: string;
	createdAt?: Date;
  updatedAt?: Date;
}
