import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVoucherDto {
	@ApiPropertyOptional({ description: 'Voucher title' })
	title?: string;

	@ApiPropertyOptional({ description: 'Voucher description' })
	description?: string;

	@ApiPropertyOptional({ description: 'Voucher value' })
	value?: number;

	@ApiPropertyOptional({ description: 'Voucher start time' })
	start?: string;

	@ApiPropertyOptional({ description: 'Voucher end time' })
	end?: string;

	@ApiPropertyOptional({ description: 'Voucher max uses' })
	maxUses?: number;

	@ApiPropertyOptional({ description: 'Voucher used count' })
	usedCount?: number;
}
