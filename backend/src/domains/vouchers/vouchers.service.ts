import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateVoucherDto } from '@/domains/vouchers/dto/createVoucher.dto';
import { UpdateVoucherDto } from '@/domains/vouchers/dto/updateVoucher.dto';
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

	async getAllWithPagination(page: number, limit: number) {
		if (page < 1) page = 1;
		if (limit < 1) limit = 10;

		const skip = (page - 1) * limit;

		const [vouchers, total] = await Promise.all([
			this.voucherModel.find().skip(skip).limit(limit).exec(),
			this.voucherModel.countDocuments().exec(),
		]);

		const totalPages = Math.ceil(total / limit);

		this.logger.debug(
			`Fetched vouchers with pagination: page ${page}, limit ${limit}`,
		);

		return {
			success: true,
			message: 'Vouchers fetched successfully.',
			data: {
				vouchers,
				pagination: {
					total,
					page,
					limit,
					totalPages,
				},
			},
		};
	}

	async getOne(identifier: string) {
		const voucher = await this.findVoucherByIdentifier(identifier);

		if (!voucher) {
			this.logger.error(
				`Voucher with ${/^[0-9a-fA-F]{24}$/.test(identifier) ? 'id' : 'code'} ${identifier} not found!`,
			);
			throw new NotFoundException('Voucher not found');
		}

		this.logger.log(
			`Voucher with ${/^[0-9a-fA-F]{24}$/.test(identifier) ? 'id' : 'code'} ${identifier} fetched successfully`,
		);

		return {
			success: true,
			message: 'Voucher fetched successfully.',
			data: voucher,
		};
	}

	async update(identifier: string, updateVoucherDto: UpdateVoucherDto) {
		const voucher = await this.findVoucherByIdentifier(identifier);

		if (!voucher) {
			this.logger.error(
				`Voucher with ${/^[0-9a-fA-F]{24}$/.test(identifier) ? 'id' : 'code'} ${identifier} not found!`,
			);
			throw new NotFoundException('Voucher not found');
		}

		this.logger.debug(
			`Updating voucher with ${/^[0-9a-fA-F]{24}$/.test(identifier) ? 'id' : 'code'} ${identifier}`,
			updateVoucherDto,
		);

		const updatedVoucher = await this.voucherModel
			.findOneAndUpdate({ _id: voucher._id }, updateVoucherDto, {
				new: true,
				runValidators: true,
			})
			.select('-__v');

		this.logger.log(
			`Voucher with ${/^[0-9a-fA-F]{24}$/.test(identifier) ? 'id' : 'code'} ${identifier} updated successfully`,
		);

		return {
			success: true,
			message: 'Voucher updated successfully.',
			data: updatedVoucher,
		};
	}

	async delete(identifier: string) {
		const voucher = await this.findVoucherByIdentifier(identifier);

		if (!voucher) {
			this.logger.error(
				`Voucher with ${/^[0-9a-fA-F]{24}$/.test(identifier) ? 'id' : 'code'} ${identifier} not found!`,
			);
			throw new NotFoundException('Voucher not found');
		}

		await this.voucherModel.findOneAndDelete({ _id: voucher._id });

		this.logger.log(
			`Voucher with ${/^[0-9a-fA-F]{24}$/.test(identifier) ? 'id' : 'code'} ${identifier} deleted successfully`,
		);

		return {
			success: true,
			message: 'Voucher deleted successfully.',
		};
	}

	async findVoucherByIdentifier(identifier: string) {
		const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
		const query = isObjectId ? { _id: identifier } : { code: identifier };

		return await this.voucherModel.findOne(query).select('-__v');
	}
}
