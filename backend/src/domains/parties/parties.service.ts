import {
	BadRequestException,
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePartyDto } from '@/domains/parties/dto/createParty.dto';
import { PartyOptionDto } from '@/domains/parties/dto/partyOption.dto';
import { UpdatePartyDto } from '@/domains/parties/dto/updateParty.dto';
import { Party } from '@/schemas/party.schema';

@Injectable()
export class PartiesService {
	private readonly logger = new Logger(PartiesService.name);

	constructor(
		@InjectModel(Party.name) private readonly partyModel: Model<Party>,
	) {}

	private validateOptions(options: PartyOptionDto[]) {
		const seenTypes = new Set<string>();

		options.forEach((updatedOption) => {
			if (seenTypes.has(updatedOption.type)) {
				throw new BadRequestException(
					`Duplicate option type: ${updatedOption.type}`,
				);
			}
			seenTypes.add(updatedOption.type);

			const isValidType = ['Basic', 'Premium', 'VIP'].includes(
				updatedOption.type,
			);
			if (!isValidType) {
				throw new BadRequestException(
					`Invalid option type: ${updatedOption.type}`,
				);
			}

			if (typeof updatedOption.price !== 'number' || updatedOption.price < 0) {
				throw new BadRequestException(`Invalid price: ${updatedOption.price}`);
			}
		});
	}

	async create(createPartyDto: CreatePartyDto) {
		const existingParty = await this.partyModel.findOne({
			title: createPartyDto.title,
		});

		if (existingParty) {
			this.logger.error(
				`Party with name ${createPartyDto.title} already exists!`,
			);
			throw new ConflictException('Party already exists');
		}

		if (createPartyDto.options) {
			this.validateOptions(createPartyDto.options);
		}

		const createdParty = new this.partyModel(createPartyDto);

		this.logger.debug(
			`Creating party with name ${createdParty.title}`,
			createdParty,
		);
		await createdParty.save();
		this.logger.log(`Party with name ${createdParty.title} created`);

		return {
			success: true,
			message: 'Party created successfully.',
			data: createdParty,
		};
	}

	async getAll() {
		const parties = await this.partyModel.find();
		this.logger.debug('Fetching all parties', parties);

		return {
			success: true,
			message: 'Parties fetched successfully.',
			data: parties,
		};
	}

	async getAllWithPagination(page: number, limit: number) {
		if (page < 1) page = 1;
		if (limit < 1) limit = 10;

		const skip = (page - 1) * limit;

		const [parties, total] = await Promise.all([
			this.partyModel.find().skip(skip).limit(limit).exec(),
			this.partyModel.countDocuments().exec(),
		]);

		this.logger.debug('Fetching all parties with pagination', parties);

		const totalPages = Math.ceil(total / limit);

		return {
			success: true,
			message: 'Parties fetched successfully.',
			data: {
				parties,
				pagination: {
					total,
					page,
					limit,
					totalPages,
				},
			},
		};
	}

	async getByCategoryWithPagination(
		category: string,
		page: number,
		limit: number,
	) {
		if (page < 1) page = 1;
		if (limit < 1) limit = 10;

		const skip = (page - 1) * limit;

		const [parties, total] = await Promise.all([
			this.partyModel.find({ category }).skip(skip).limit(limit).exec(),
			this.partyModel.countDocuments({ category }).exec(),
		]);

		this.logger.debug('Fetching parties by category with pagination', parties);

		const totalPages = Math.ceil(total / limit);

		return {
			success: true,
			message: 'Parties fetched successfully.',
			data: {
				parties,
				pagination: {
					total,
					page,
					limit,
					totalPages,
				},
			},
		};
	}

	async getByUserIdWithPagination(userId: string, page: number, limit: number) {
		if (page < 1) page = 1;
		if (limit < 1) limit = 10;

		const skip = (page - 1) * limit;

		const [parties, total] = await Promise.all([
			this.partyModel.find({ user: userId }).skip(skip).limit(limit).exec(),
			this.partyModel.countDocuments({ user: userId }).exec(),
		]);

		this.logger.debug('Fetching parties by user ID with pagination', parties);

		const totalPages = Math.ceil(total / limit);

		return {
			success: true,
			message: 'Parties fetched successfully.',
			data: {
				parties,
				pagination: {
					total,
					page,
					limit,
					totalPages,
				},
			},
		};
	}

	async getOne(id: string) {
		const party = await this.partyModel.findById(id);

		if (!party) {
			this.logger.error(`Party with ID ${id} not found!`);
			throw new NotFoundException('Party not found');
		}

		this.logger.debug(`Fetching party with ID ${id}`, party);

		return {
			success: true,
			message: 'Party fetched successfully.',
			data: party,
		};
	}

	async update(id: string, updatePartyDto: UpdatePartyDto) {
		const currentParty = await this.partyModel.findById(id);

		if (!currentParty) {
			this.logger.error(`Party with ID ${id} not found!`);
			throw new NotFoundException('Party not found');
		}

		if (updatePartyDto.options) {
			this.validateOptions(updatePartyDto.options);

			updatePartyDto.options.forEach((updatedOption) => {
				const existingOptionIndex = currentParty.options.findIndex(
					(option) => option.type === updatedOption.type,
				);

				if (existingOptionIndex !== -1) {
					currentParty.options[existingOptionIndex] = {
						...currentParty.options[existingOptionIndex],
						...updatedOption,
					};
				} else {
					currentParty.options.push(updatedOption);
				}
			});
		}

		const updatedParty = await this.partyModel.findByIdAndUpdate(
			id,
			currentParty,
			{ new: true },
		);

		this.logger.debug(`Updating party with ID ${id}`, updatedParty);
		this.logger.log(`Party with ID ${id} updated`);

		return {
			success: true,
			message: 'Party updated successfully.',
			data: updatedParty,
		};
	}

	async delete(id: string) {
		const party = await this.partyModel.findById(id);

		if (!party) {
			this.logger.error(`Party with ID ${id} not found!`);
			throw new NotFoundException('Party not found');
		}

		await this.partyModel.deleteOne({ _id: id });

		this.logger.debug(`Deleting party with ID ${id}`);

		return {
			success: true,
			message: 'Party deleted successfully.',
		};
	}
}
