import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { NotifyDto } from '@/domains/notifies/dto/notify.dto';

export class SendEmailDto {
	@ApiProperty({ description: 'Notify data' })
	@IsNotEmpty()
	notifyDto: NotifyDto;

	@ApiProperty({ description: 'Notify template' })
	@IsString()
	@IsIn(['welcome', 'verifyOTP', 'bookingSuccess'])
	template: 'welcome' | 'verifyOTP' | 'bookingSuccess';
}
