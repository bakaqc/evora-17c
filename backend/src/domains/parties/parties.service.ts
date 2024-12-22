import { ConflictException, Injectable, Logger } from '@nestjs/common';
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
}
