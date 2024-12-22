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

	async getOne(identifier: string) {
		const party = await this.findPartyByIdentifier(identifier);

		if (!party) {
			this.logger.error(
				`Party with ${/^[0-9a-fA-F]{24}$/.test(identifier) ? 'id' : 'category'} ${identifier} not found!`,
			);
			throw new NotFoundException('Party not found');
		}

		this.logger.log(
			`Party with ${/^[0-9a-fA-F]{24}$/.test(identifier) ? 'id' : 'category'} ${identifier} fetched successfully`,
		);

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
		const party = await this.findPartyByIdentifier(id);

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

	async findPartyByIdentifier(identifier: string) {
		const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
		const query = isObjectId ? { _id: identifier } : { category: identifier };

		return await this.partyModel.findOne(query).select('-__v');
	}
}
