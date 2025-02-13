import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChangePasswordDto } from '@/domains/users/dto/changePassword.dto';
import { CreateUserDto } from '@/domains/users/dto/createUser.dto';
import { UpdateUserDto } from '@/domains/users/dto/updateUser.dto';
import { User } from '@/schemas/user.schema';
import { hash } from '@/utils/hash.util';
import { verify } from '@/utils/verify.util';

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name);

	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	async create(createUserDto: CreateUserDto) {
		const existingUser = await this.userModel.findOne({
			email: createUserDto.email,
		});

		if (existingUser) {
			this.logger.error(
				`User with email ${createUserDto.email} already exists!`,
			);

			throw new ConflictException('User already exists');
		}

		const createdUser = new this.userModel({
			...createUserDto,
			hashedPassword: await hash(createUserDto.password),
		});

		this.logger.debug(
			`Creating user with email ${createdUser.email}`,
			createdUser,
		);

		await createdUser.save();

		this.logger.log(`User with email ${createdUser.email} created`);

		return {
			success: true,
			message: 'User created successfully.',
			data: this.cleanUser(createdUser),
		};
	}

	async getAll() {
		const users = await this.userModel.find().select('-hashedPassword -__v');

		this.logger.log('Users fetched successfully');

		return {
			success: true,
			message: 'Users fetched successfully.',
			data: users,
		};
	}

	async getAllWithPagination(page: number, limit: number) {
		if (page < 1) page = 1;
		if (limit < 1) limit = 10;

		const skip = (page - 1) * limit;

		const [users, total] = await Promise.all([
			this.userModel.find().skip(skip).limit(limit).exec(),
			this.userModel.countDocuments().exec(),
		]);

		const totalPages = Math.ceil(total / limit);

		this.logger.debug(
			`Fetched users with pagination: page ${page}, limit ${limit}`,
		);

		return {
			success: true,
			message: 'Users fetched successfully.',
			data: {
				users,
				pagination: {
					total,
					page,
					limit,
					totalPages,
				},
			},
		};
	}

	async getOne(identifier: string, isEmail = false) {
		const user = await this.findUser(identifier, isEmail);

		this.logger.debug(
			`Found user with ${isEmail ? 'email' : 'ID'} ${identifier}`,
			user,
		);
		this.logger.log('User fetched successfully');

		return {
			success: true,
			message: 'User fetched successfully.',
			data: this.cleanUser(user),
		};
	}

	async update(
		identifier: string,
		updateUserDto: UpdateUserDto,
		isEmail = false,
	) {
		const user = await this.findUser(identifier, isEmail);

		const updatedUser = await this.userModel.findOneAndUpdate(
			{ _id: user._id },
			updateUserDto,
			{ new: true },
		);

		this.logger.debug(
			`Updated user with ${isEmail ? 'email' : 'ID'} ${identifier}`,
			updatedUser,
		);
		this.logger.log('User updated successfully');

		return {
			success: true,
			message: 'User updated successfully.',
			data: this.cleanUser(updatedUser),
		};
	}

	async delete(identifier: string, isEmail = false) {
		const user = await this.findUser(identifier, isEmail);

		if (user.role === 'super-admin') {
			this.logger.error('Cannot delete super-admin');

			throw new ConflictException('Cannot delete super-admin');
		}

		await this.userModel.deleteOne({ _id: user._id });

		this.logger.debug(
			`Deleted user with ${isEmail ? 'email' : 'ID'} ${identifier}`,
		);
		this.logger.log('User deleted successfully');

		return {
			success: true,
			message: 'User deleted successfully.',
		};
	}

	async findUser(identifier: string, isEmail = false) {
		const query = isEmail ? { email: identifier } : { _id: identifier };

		const user = await this.userModel
			.findOne(query)
			.select('-hashedPassword -__v');

		if (!user) {
			const identifierType = isEmail ? 'email' : 'ID';
			this.logger.error(`User with ${identifierType} ${identifier} not found`);
			throw new NotFoundException('User not found');
		}

		return user;
	}

	cleanUser(user: any) {
		const userObject = user.toObject();
		delete userObject.hashedPassword;
		return userObject;
	}

	async changePassword(email: string, changePasswordDto: ChangePasswordDto) {
		const user = await this.userModel.findOne({ email });

		if (!user) {
			this.logger.error(`User with email ${email} not found`);

			throw new NotFoundException('User not found');
		}

		const isPasswordValid = await verify(
			user.hashedPassword,
			changePasswordDto.currentPassword,
		);

		if (!isPasswordValid) {
			this.logger.error('Old password is incorrect');

			throw new ConflictException('Old password is incorrect');
		}

		user.hashedPassword = await hash(changePasswordDto.newPassword);

		await user.save();

		this.logger.log('Password changed successfully');

		return {
			success: true,
			message: 'Password changed successfully.',
		};
	}
}
