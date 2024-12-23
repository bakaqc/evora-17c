import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePaymentDto } from '@/domains/payments/dto/createPayment.dto';
import { MomoService } from '@/domains/payments/momo/momo.service';
import { PaymentsService } from '@/domains/payments/payments.service';
import { ZalopayService } from '@/domains/payments/zalopay/zalopay.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
	constructor(
		private readonly paymentsService: PaymentsService,
		private readonly zalopayService: ZalopayService,
		private readonly momoService: MomoService,
	) {}

	@HttpCode(HttpStatus.OK)
	@Post()
	async create(@Body() createPaymentDto: CreatePaymentDto) {
		const response = await this.paymentsService.create(createPaymentDto);
		const { order_url } = response;

		return { payment_url: order_url };
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
