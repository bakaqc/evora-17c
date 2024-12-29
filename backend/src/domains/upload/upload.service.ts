import { Injectable, Logger } from '@nestjs/common';

import { cloudinary } from '@/domains/upload/config/cloudinary.config';

@Injectable()
export class UploadService {
	private readonly logger = new Logger(UploadService.name);

	async uploadImage(file: Express.Multer.File): Promise<any> {
		try {
			const result = await new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					{ folder: process.env.CLOUDINARY_FOLDER_STORAGE || 'default_folder' },
					(error, result) => {
						if (error) {
							this.logger.error(
								`Error uploading image to Cloudinary: ${error.message}`,
								error.stack,
							);
							reject(error);
						} else {
							this.logger.log('Image uploaded to Cloudinary successfully');
							resolve(result);
						}
					},
				);

				uploadStream.end(file.buffer);
			});

			return result;
		} catch (error) {
			this.logger.error(
				`Error uploading image to Cloudinary: ${error.message}`,
				error.stack,
			);
			throw error;
		}
	}
}
