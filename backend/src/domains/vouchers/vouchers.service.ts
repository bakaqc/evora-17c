import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateVoucherDto } from '@/domains/vouchers/dto/createVoucher.dto';
import { Voucher } from '@/schemas/voucher.schema';

@Injectable()
export class VouchersService {
	private readonly logger = new Logger(VouchersService.name);

	constructor(
		@InjectModel(Voucher.name) private readonly voucherModel: Model<Voucher>,
	) {}

	async create(createVoucherDto: CreateVoucherDto) {
		const existingVoucher = await this.voucherModel.findOne({
			code: createVoucherDto.code,
		});

		if (existingVoucher) {
			this.logger.error(
				`Voucher with code ${createVoucherDto.code} already exists!`,
			);

			throw new ConflictException('Voucher already exists');
		}

		const createdVoucher = new this.voucherModel(createVoucherDto);

		this.logger.debug(
			`Creating voucher with code ${createdVoucher.code}`,
			createdVoucher,
		);

		await createdVoucher.save();

		this.logger.log(`Voucher with code ${createdVoucher.code} created`);

		return {
			success: true,
			message: 'Voucher created successfully.',
			data: createdVoucher,
		};
	}

	async getAll() {
		const vouchers = await this.voucherModel.find().select('-__v');

		this.logger.log('Vouchers fetched successfully');

		return {
			success: true,
			message: 'Vouchers fetched successfully.',
			data: vouchers,
		};
	}

	async getOne(identifier: string) {
		const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

		const query = isObjectId ? { _id: identifier } : { code: identifier };
		const voucher = await this.voucherModel.findOne(query).select('-__v');

		if (!voucher) {
			this.logger.error(
				`Voucher with ${isObjectId ? 'id' : 'code'} ${identifier} not found!`,
			);
			throw new NotFoundException('Voucher not found');
		}

		this.logger.log(
			`Voucher with ${isObjectId ? 'id' : 'code'} ${identifier} fetched successfully`,
		);

		return {
			success: true,
			message: 'Voucher fetched successfully.',
			data: voucher,
		};
	}
}
