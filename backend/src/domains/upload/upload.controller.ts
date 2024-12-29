import {
	BadRequestException,
	Controller,
	Post,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { multerOptions } from '@/domains/upload/config/multer.config';
import { UploadService } from '@/domains/upload/upload.service';

@ApiTags('Upload')
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post()
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'File upload (only image files are allowed)',
		schema: {
			type: 'object',
			properties: {
				files: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary',
					},
				},
			},
		},
	})
	@UseInterceptors(FilesInterceptor('files', 20, multerOptions))
	async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
		if (!files || files.length === 0) {
			throw new BadRequestException('At least one file is required');
		}

		try {
			const uploadResults = await Promise.all(
				files.map((file) => this.uploadService.uploadImage(file)),
			);

			return {
				message: 'Files uploaded successfully',
				uploads: uploadResults.map((result) => ({
					url: result.secure_url,
					public_id: result.public_id,
				})),
			};
		} catch (error) {
			throw new BadRequestException(
				`Failed to upload files: ${error.message || 'Unknown error'}`,
			);
		}
	}
}
