import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVoucherDto {
	@ApiProperty({ description: 'User Id who own vouchers' })
	@IsString()
	@IsNotEmpty()
	user: string;

	@ApiProperty({ description: 'Voucher code' })
	@IsString()
	@IsNotEmpty()
	code: string;

	@ApiProperty({ description: 'Voucher title' })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ description: 'Voucher description' })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ description: 'Voucher value' })
	@IsNumber()
	@IsNotEmpty()
	value: number;

	@ApiProperty({ description: 'Voucher start time' })
	@IsDateString()
	@IsNotEmpty()
	start: string;

	@ApiProperty({ description: 'Voucher end time' })
	@IsDateString()
	@IsNotEmpty()
	end: string;

	@ApiProperty({ description: 'Voucher max uses' })
	@IsNumber()
	@IsNotEmpty()
	maxUses: number;

	@ApiProperty({ description: 'Voucher used count' })
	@IsNumber()
	@IsNotEmpty()
	usedCount: number;
}
