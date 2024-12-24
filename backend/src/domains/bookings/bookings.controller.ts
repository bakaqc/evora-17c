import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BookingsService } from '@/domains/bookings/bookings.service';
import { CreateBookingDto } from '@/domains/bookings/dto/createBooking.dto';

@ApiTags('Bookings')
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
}
