import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPagination() {
	return applyDecorators(
		ApiQuery({
			name: 'page',
			required: false,
			type: Number,
			example: 1,
			description: 'Page number, starts from 1',
		}),
		ApiQuery({
			name: 'limit',
			required: false,
			type: Number,
			example: 10,
			description: 'Number of items per page',
		}),
	);
}
