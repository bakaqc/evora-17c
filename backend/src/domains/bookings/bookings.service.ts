import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateBookingDto } from '@/domains/bookings/dto/updateBooking.dto';
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

	async getAllWithPagination(page: number, limit: number) {
		if (page < 1) page = 1;
		if (limit < 1) limit = 10;

		const skip = (page - 1) * limit;

		const [bookings, total] = await Promise.all([
			this.bookingModel.find().skip(skip).limit(limit).exec(),
			this.bookingModel.countDocuments().exec(),
		]);

		const totalPages = Math.ceil(total / limit);

		this.logger.debug(
			`Fetched bookings with pagination: page ${page}, limit ${limit}`,
		);

		return {
			success: true,
			message: 'Bookings fetched successfully.',
			data: {
				bookings,
				pagination: {
					total,
					page,
					limit,
					totalPages,
				},
			},
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

	async getByStatus(status: 'PENDING' | 'APPROVED' | 'CANCELLED') {
		const bookings = await this.bookingModel.find({ status }).select('-__v');

		this.logger.log(`Bookings with status ${status} fetched successfully`);

		return {
			success: true,
			message: 'Bookings fetched successfully.',
			data: bookings,
		};
	}

	async update(id: string, updateBookingDto: UpdateBookingDto) {
		const booking = await this.bookingModel.findByIdAndUpdate(
			id,
			updateBookingDto,
			{
				new: true,
			},
		);

		if (!booking) {
			this.logger.error(`Booking with ID ${id} not found!`);

			throw new ConflictException('Booking not found');
		}

		this.logger.log(`Booking with ID ${id} updated successfully`);

		return {
			success: true,
			message: 'Booking updated successfully.',
			data: booking,
		};
	}

	async delete(id: string) {
		const booking = await this.bookingModel.findByIdAndDelete(id);

		if (!booking) {
			this.logger.error(`Booking with ID ${id} not found!`);

			throw new ConflictException('Booking not found');
		}

		this.logger.log(`Booking with ID ${id} deleted successfully`);

		return {
			success: true,
			message: 'Booking deleted successfully.',
		};
	}
}
