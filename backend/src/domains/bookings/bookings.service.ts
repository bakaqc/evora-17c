import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Booking } from '@/schemas/booking.schema';

@Injectable()
export class BookingsService {
	private readonly logger = new Logger(BookingsService.name);

	constructor(
		@InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
	) {}

	async create(createBookingDto: any) {
		const existingBooking = await this.bookingModel.findOne({
			party: createBookingDto.party,
			user: createBookingDto.user,
			guestCount: createBookingDto.guestCount,
			organizeDate: createBookingDto.organizeDate,
			organizedAt: createBookingDto.organizedAt,
		});

		if (existingBooking) {
			this.logger.error(
				`Booking with party ${createBookingDto.party} already exists!`,
			);

			throw new ConflictException('Booking already exists');
		}

		const createdBooking = new this.bookingModel(createBookingDto);

		this.logger.debug(`Creating booking`, createdBooking);

		await createdBooking.save();

		this.logger.log(`Booking created`);

		return {
			success: true,
			message: 'Booking created successfully.',
			data: createdBooking,
		};
	}

	async getAll() {
		const bookings = await this.bookingModel.find().select('-__v');

		this.logger.log('Bookings fetched successfully');

		return {
			success: true,
			message: 'Bookings fetched successfully.',
			data: bookings,
		};
	}

	async getById(id: string) {
		const booking = await this.bookingModel.findById(id).select('-__v');

		if (!booking) {
			this.logger.error(`Booking with ID ${id} not found!`);

			throw new ConflictException('Booking not found');
		}

		this.logger.log(`Booking with ID ${id} fetched successfully`);

		return {
			success: true,
			message: 'Booking fetched successfully.',
			data: booking,
		};
	}

	async getByPartyId(partyId: string) {
		const bookings = await this.bookingModel
			.find({ party: partyId })
			.select('-__v');

		this.logger.log(`Bookings with party ID ${partyId} fetched successfully`);

		return {
			success: true,
			message: 'Bookings fetched successfully.',
			data: bookings,
		};
	}

	async getByUserId(userId: string) {
		const bookings = await this.bookingModel
			.find({ user: userId })
			.select('-__v');

		this.logger.log(`Bookings with user ID ${userId} fetched successfully`);

		return {
			success: true,
			message: 'Bookings fetched successfully.',
			data: bookings,
		};
	}

	async getByPaymentId(paymentId: string) {
		const booking = await this.bookingModel
			.findOne({ payment: paymentId })
			.select('-__v');

		if (!booking) {
			this.logger.error(`Booking with payment ID ${paymentId} not found!`);

			throw new ConflictException('Booking not found');
		}

		this.logger.log(
			`Booking with payment ID ${paymentId} fetched successfully`,
		);

		return {
			success: true,
			message: 'Booking fetched successfully.',
			data: booking,
		};
	}
}
