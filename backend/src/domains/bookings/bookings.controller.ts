import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';

import { ApiPagination } from '@/domains/auth/decorators/pagination.decorator';
import { Roles } from '@/domains/auth/decorators/roles.decorator';
import { Role } from '@/domains/auth/enums/role.enum';
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

	@Roles(Role.SUPER_ADMIN)
	@ApiOperation({
		summary: 'Fetch all bookings with pagination - Super Admin only',
	})
	@ApiPagination()
	@Get()
	async getAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 10,
	) {
		return this.bookingsService.getAllWithPagination(page, limit);
	}

	@ApiOperation({ summary: 'Fetch a booking by ID' })
	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.bookingsService.getById(id);
	}

	@Roles(Role.SUPER_ADMIN, Role.ADMIN)
	@ApiOperation({
		summary: 'Fetch bookings by party ID - Super Admin & Admin only',
	})
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

	@Roles(Role.SUPER_ADMIN)
	@ApiOperation({ summary: 'Fetch bookings by status -  - Super Admin only' })
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

	@Roles(Role.SUPER_ADMIN, Role.ADMIN)
	@ApiOperation({
		summary: 'Update booking by ID -  - Super Admin & Admin only',
	})
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateBookingDto: UpdateBookingDto,
	) {
		return this.bookingsService.update(id, updateBookingDto);
	}

	@Roles(Role.SUPER_ADMIN, Role.ADMIN)
	@ApiOperation({ summary: 'Delete booking by ID - Super Admin & Admin only' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.bookingsService.delete(id);
	}
}
