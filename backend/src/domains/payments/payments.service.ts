import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePaymentDto } from '@/domains/payments/dto/createPayment.dto';
import { MomoService } from '@/domains/payments/momo/momo.service';
import { ZalopayService } from '@/domains/payments/zalopay/zalopay.service';
import { Payment } from '@/schemas/payment.schema';

@Injectable()
export class PaymentsService {
	private readonly logger = new Logger(PaymentsService.name);

	constructor(
		@InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
		private readonly zalopayService: ZalopayService,
		private readonly momoService: MomoService,
	) {}

	async create(createPaymentDto: CreatePaymentDto) {
		const newPayment = new this.paymentModel(createPaymentDto);

		this.logger.debug('Creating new payment');

		this.logger.debug('Payment created', newPayment);
		this.logger.log('Payment created');

		// Add paymentId to Booking

		await newPayment.save();

		switch (createPaymentDto.method) {
			case 'vn-pay': {
				const result = await this.zalopayService.create({
					id: newPayment._id.toString(),
					amount: newPayment.finalPrice,
				});

				return { order_url: result.order_url };
			}
			case 'zalo-pay': {
				const result = await this.zalopayService.create({
					id: newPayment._id.toString(),
					amount: newPayment.finalPrice,
				});

				return { order_url: result.order_url };
			}

			case 'momo': {
				const result = await this.momoService.create({
					id: newPayment._id.toString(),
					amount: newPayment.finalPrice,
				});

				return { order_url: result.shortLink };
			}
		}
	}
}
