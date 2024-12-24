import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BookingsService } from '@/domains/bookings/bookings.service';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
	constructor(private readonly bookingsService: BookingsService) {}
}
