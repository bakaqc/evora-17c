import * as argon2 from 'argon2';

export const verify = async (
	hashedPassword: string,
	plainPassword: string,
): Promise<boolean> => {
	return await argon2.verify(hashedPassword, plainPassword);
};
