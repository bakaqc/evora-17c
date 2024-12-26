import { User } from '@/schemas/user.schema';

export interface Voucher {
	_id: string;
	user: User;
	code: string;
	title: string;
	description: string;
	value: number;
	start: Date;
	end: Date;
	maxUses: number;
	usedCount: number;
	createdAt?: Date;
	updatedAt?: Date;
}
