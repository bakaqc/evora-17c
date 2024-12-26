import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';

import { BookingsService } from '@/domains/bookings/bookings.service';
import { CreateBookingDto } from '@/domains/bookings/dto/createBooking.dto';
import { UpdateBookingDto } from '@/domains/bookings/dto/updateBooking.dto';

@ApiTags('Bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingsController {
	constructor(private readonly bookingsService: BookingsService) {}

	@ApiOperation({ summary: 'Create a new booking' })
	@Post()
	async create(@Body() createBookingDto: CreateBookingDto) {
		return this.bookingsService.create(createBookingDto);
	}

	@ApiOperation({ summary: 'Fetch all bookings' })
	@Get()
	async getAll() {
		return this.bookingsService.getAll();
	}

	@ApiOperation({ summary: 'Fetch a booking by ID' })
	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.bookingsService.getById(id);
	}

	@ApiOperation({ summary: 'Fetch bookings by party ID' })
	@Get('party/:partyId')
	async getByPartyId(@Param('partyId') partyId: string) {
		return this.bookingsService.getByPartyId(partyId);
	}

	@ApiOperation({ summary: 'Fetch bookings by user ID' })
	@Get('user/:userId')
	async getByUserId(@Param('userId') userId: string) {
		return this.bookingsService.getByUserId(userId);
	}

	@ApiOperation({ summary: 'Fetch booking by payment ID' })
	@Get('payment/:paymentId')
	async getByPaymentId(@Param('paymentId') paymentId: string) {
		return this.bookingsService.getByPaymentId(paymentId);
	}

	@ApiOperation({ summary: 'Fetch bookings by status' })
	@ApiParam({
		name: 'status',
		enum: ['PENDING', 'APPROVED', 'CANCELLED'],
		required: true,
	})
	@Get('status/:status')
	async getByStatus(
		@Param('status') status: 'PENDING' | 'APPROVED' | 'CANCELLED',
	) {
		return this.bookingsService.getByStatus(status);
	}

	@ApiOperation({ summary: 'Update booking by ID' })
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateBookingDto: UpdateBookingDto,
	) {
		return this.bookingsService.update(id, updateBookingDto);
	}

	@ApiOperation({ summary: 'Delete booking by ID' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.bookingsService.delete(id);
	}
}
