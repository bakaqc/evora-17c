import { User } from '@/schemas/user.schema';

export interface Notify {
	_id: string;
	user: User[];
	title: string;
	message: string;
	createdAt?: Date;
  updatedAt?: Date;
}
