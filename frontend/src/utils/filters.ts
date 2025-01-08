import { TableUser } from '@/schemas/user.schema';

export const filterUsers = (
	users: TableUser[],
	searchText: string,
): TableUser[] => {
	return users.filter(
		(user) =>
			user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
			user.email.toLowerCase().includes(searchText.toLowerCase()) ||
			user.phoneNumber.toLowerCase().includes(searchText.toLowerCase()) ||
			user.role.toLowerCase().includes(searchText.toLowerCase()),
	);
};
