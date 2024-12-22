import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class NotifyDto {
	@ApiProperty({ description: 'User Id who receive parties' })
	@IsArray()
	@IsNotEmpty()
	users: string[];

	@ApiProperty({ description: 'Notify title' })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ description: 'Notify message' })
	@IsString()
	@IsNotEmpty()
	message: string;
}
