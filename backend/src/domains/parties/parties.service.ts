import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePartyDto } from '@/domains/parties/dto/createParty.dto';
import { Party } from '@/schemas/party.schema';

@Injectable()
export class PartiesService {
	private readonly logger = new Logger(PartiesService.name);

	constructor(
		@InjectModel(Party.name) private readonly partyModel: Model<Party>,
	) {}

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

	async findPartyByIdentifier(identifier: string) {
		const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
		const query = isObjectId ? { _id: identifier } : { category: identifier };

		return await this.partyModel.findOne(query).select('-__v');
	}
}
