import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
	@ApiProperty({ description: 'Vouchers ID have used by user' })
	@IsMongoId()
	@IsNotEmpty()
	voucher: string;

	@ApiProperty({ description: 'Payment method' })
	@IsEnum(['momo', 'zalo-pay'])
	@IsNotEmpty()
	method: 'momo' | 'zalo-pay';

	@ApiProperty({ description: 'Payment origin price' })
	@IsNumber()
	@IsNotEmpty()
	originPrice: number;

	@ApiProperty({ description: 'Payment final price' })
	@IsNumber()
	@IsNotEmpty()
	finalPrice: number;
}
