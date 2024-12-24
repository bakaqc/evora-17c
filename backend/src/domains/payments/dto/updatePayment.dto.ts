import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePaymentDto {
	@ApiPropertyOptional({ description: 'Vouchers ID have used by user' })
	voucher?: string;

	@ApiPropertyOptional({ description: 'Payment method' })
	method?: 'momo' | 'zalo-pay';

	@ApiPropertyOptional({ description: 'Payment origin price' })
	originPrice?: number;

	@ApiPropertyOptional({ description: 'Payment final price' })
	finalPrice?: number;
}
