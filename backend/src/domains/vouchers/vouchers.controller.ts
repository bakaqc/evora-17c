import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { VouchersService } from '@/domains/vouchers/vouchers.service';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VouchersController {
	constructor(private readonly vouchersService: VouchersService) {}
}
