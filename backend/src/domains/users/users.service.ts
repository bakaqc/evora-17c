import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '@/domains/users/dto/createUser.dto';
import { User } from '@/schemas/user.schema';
import { hash } from '@/utils/hash.util';

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

		const userObject = createdUser.toObject();
		delete userObject.hashedPassword;

		return {
			success: true,
			message: 'User created successfully.',
			data: userObject,
		};
	}

	async getAll() {
		const users = await this.userModel.find().select('-hashedPassword -__v');

		if (!users) {
			this.logger.error('No users found');

			throw new NotFoundException('No users found');
		}

		this.logger.debug(`Found ${users.length} users`, users);

		this.logger.log('Users fetched successfully');

		return {
			success: true,
			message: 'Users fetched successfully.',
			data: users,
		};
	}

	async getOne(identifier: string, isEmail = false) {
		const query = isEmail ? { email: identifier } : { _id: identifier };

		const user = await this.userModel
			.findOne(query)
			.select('-hashedPassword -__v');

		if (!user) {
			const identifierType = isEmail ? 'email' : 'ID';
			this.logger.error(`User with ${identifierType} ${identifier} not found`);

			throw new NotFoundException('User not found');
		}

		this.logger.debug(
			`Found user with ${isEmail ? 'email' : 'ID'} ${identifier}`,
			user,
		);

		this.logger.log('User fetched successfully');

		return {
			success: true,
			message: 'User fetched successfully.',
			data: user,
		};
	}
}
