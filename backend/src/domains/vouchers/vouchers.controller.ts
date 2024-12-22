import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateVoucherDto } from '@/domains/vouchers/dto/createVoucher.dto';
import { UpdateVoucherDto } from '@/domains/vouchers/dto/updateVoucher.dto';
import { VouchersService } from '@/domains/vouchers/vouchers.service';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VouchersController {
	constructor(private readonly vouchersService: VouchersService) {}

	@ApiOperation({ summary: 'Create a new voucher' })
	@Post()
	async create(@Body() CreateVoucherDto: CreateVoucherDto) {
		return await this.vouchersService.create(CreateVoucherDto);
	}

	@ApiOperation({ summary: 'Fetch all vouchers' })
	@Get()
	async getAll() {
		return await this.vouchersService.getAll();
	}

	@ApiOperation({ summary: 'Fetch a voucher by ID or Code' })
	@Get(':identifier')
	async getOne(@Param('identifier') identifier: string) {
		return this.vouchersService.getOne(identifier);
	}

	@ApiOperation({ summary: 'Update a voucher by ID or Code' })
	@Put(':identifier')
	async update(
		@Param('identifier') identifier: string,
		@Body() updateVoucherDto: UpdateVoucherDto,
	) {
		return this.vouchersService.update(identifier, updateVoucherDto);
	}

	@ApiOperation({ summary: 'Delete a voucher by ID or Code' })
	@Delete(':identifier')
	async delete(@Param('identifier') identifier: string) {
		return this.vouchersService.delete(identifier);
	}
}
