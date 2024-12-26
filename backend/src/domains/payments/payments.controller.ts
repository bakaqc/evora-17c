import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePaymentDto } from '@/domains/payments/dto/createPayment.dto';
import { UpdatePaymentDto } from '@/domains/payments/dto/updatePayment.dto';
import { MomoService } from '@/domains/payments/momo/momo.service';
import { PaymentsService } from '@/domains/payments/payments.service';
import { ZalopayService } from '@/domains/payments/zalopay/zalopay.service';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
	constructor(
		private readonly paymentsService: PaymentsService,
		private readonly zalopayService: ZalopayService,
		private readonly momoService: MomoService,
	) {}

	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Create a new payment' })
	@Post()
	async create(@Body() createPaymentDto: CreatePaymentDto) {
		const response = await this.paymentsService.create(createPaymentDto);
		const { order_url } = response;

		return { payment_url: order_url };
	}

	@ApiOperation({ summary: 'Fetch all payments' })
	@Get()
	async getAll() {
		return await this.paymentsService.getAll();
	}

	@ApiOperation({ summary: 'Fetch a payment by ID' })
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.paymentsService.getOne(id);
	}

	@ApiOperation({ summary: 'Fetch all payments by booking ID' })
	@Get('booking/:bookingId')
	async getByBookingId(@Param('bookingId') bookingId: string) {
		return await this.paymentsService.getByBookingId(bookingId);
	}

	@ApiOperation({ summary: 'Update a payment by ID' })
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updatePaymentDto: UpdatePaymentDto,
	) {
		return await this.paymentsService.update(id, updatePaymentDto);
	}

	@ApiOperation({ summary: 'Delete a payment by ID' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.paymentsService.delete(id);
	}

	@HttpCode(HttpStatus.OK)
	@Post('zalopay/callback')
	async zalopayCallback(@Body() body: any) {
		return await this.zalopayService.callback(body);
	}

	@HttpCode(HttpStatus.OK)
	@Post('momo/callback')
	async momoCallback(@Body() body: any) {
		return await this.momoService.callback(body);
	}
}
