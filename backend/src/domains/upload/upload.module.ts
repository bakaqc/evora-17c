import { Module } from '@nestjs/common';

import { UploadController } from '@/domains/upload/upload.controller';
import { UploadService } from '@/domains/upload/upload.service';

@Module({
	controllers: [UploadController],
	providers: [UploadService],
	exports: [UploadService],
})
export class UploadModule {}
