import { Module } from '@nestjs/common';

import { UsersModule } from '@/domains/users/users.module';

@Module({
	imports: [UsersModule],
})
export class DomainsModule {}
