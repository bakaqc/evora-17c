import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePaymentDto } from '@/domains/payments/dto/createPayment.dto';
import { UpdatePaymentDto } from '@/domains/payments/dto/updatePayment.dto';
import { MomoService } from '@/domains/payments/momo/momo.service';
import { ZalopayService } from '@/domains/payments/zalopay/zalopay.service';
import { Booking } from '@/schemas/booking.schema';
import { Payment } from '@/schemas/payment.schema';

@Injectable()
export class PaymentsService {
	private readonly logger = new Logger(PaymentsService.name);

	constructor(
		@InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
		@InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
		private readonly zalopayService: ZalopayService,
		private readonly momoService: MomoService,
	) {}

	async create(createPaymentDto: CreatePaymentDto) {
		const newPayment = new this.paymentModel(createPaymentDto);

		this.logger.debug('Creating new payment');

		this.logger.debug('Payment created', newPayment);
		this.logger.log('Payment created');

		await this.bookingModel.findByIdAndUpdate(createPaymentDto.booking, {
			$push: { payments: newPayment._id },
			$set: { status: 'APPROVED' },
		});

		await newPayment.save();

		switch (createPaymentDto.method) {
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

	async getAll() {
		const payments = await this.paymentModel.find().select('-__v');

		this.logger.log('Payments fetched successfully');

		return {
			success: true,
			message: 'Payments fetched successfully.',
			data: payments,
		};
	}

	async getOne(id: string) {
		const payment = await this.paymentModel.findById(id).select('-__v');

		if (!payment) {
			this.logger.error(`Payment with ID ${id} not found!`);

			throw new NotFoundException('Payment not found');
		}

		this.logger.log(`Payment with ID ${id} fetched successfully`);

		return {
			success: true,
			message: 'Payment fetched successfully.',
			data: payment,
		};
	}

	async getByBookingId(bookingId: string) {
		const payments = await this.paymentModel
			.find({ booking: bookingId })
			.select('-__v');

		this.logger.log(
			`Payments with booking ID ${bookingId} fetched successfully`,
		);

		return {
			success: true,
			message: 'Payments fetched successfully.',
			data: payments,
		};
	}

	async update(id: string, updatePaymentDto: UpdatePaymentDto) {
		const payment = await this.paymentModel.findByIdAndUpdate(
			id,
			updatePaymentDto,
			{
				new: true,
			},
		);

		if (!payment) {
			this.logger.error(`Payment with ID ${id} not found!`);

			throw new NotFoundException('Payment not found');
		}

		this.logger.log(`Payment with ID ${id} updated successfully`);

		return {
			success: true,
			message: 'Payment updated successfully.',
			data: payment,
		};
	}

	async delete(id: string) {
		const payment = await this.paymentModel.findByIdAndDelete(id);

		if (!payment) {
			this.logger.error(`Payment with ID ${id} not found!`);

			throw new NotFoundException('Payment not found');
		}

		this.logger.log(`Payment with ID ${id} deleted successfully`);

		return {
			success: true,
			message: 'Payment deleted successfully.',
		};
	}
}
