import * as argon2 from 'argon2';

export const hash = async (plainPassword: string): Promise<string> => {
	return await argon2.hash(plainPassword);
};
