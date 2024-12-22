import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Voucher } from '@/schemas/voucher.schema';

@Injectable()
export class VouchersService {
	private readonly logger = new Logger(VouchersService.name);

	constructor(
		@InjectModel(Voucher.name) private readonly voucherModel: Model<Voucher>,
	) {}
}
