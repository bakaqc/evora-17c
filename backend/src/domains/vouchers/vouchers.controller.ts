import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateVoucherDto } from '@/domains/vouchers/dto/createVoucher.dto';
import { VouchersService } from '@/domains/vouchers/vouchers.service';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VouchersController {
	constructor(private readonly vouchersService: VouchersService) {}

	@Post()
	async create(@Body() CreateVoucherDto: CreateVoucherDto) {
		return await this.vouchersService.create(CreateVoucherDto);
	}

	@Get()
	async getAll() {
		return await this.vouchersService.getAll();
	}
}
