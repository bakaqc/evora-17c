import { Module } from '@nestjs/common';

import { NotificationsModule } from '@/domains/notifications/notifications.module';
import { PartiesModule } from '@/domains/parties/parties.module';
import { UsersModule } from '@/domains/users/users.module';
import { VouchersModule } from '@/domains/vouchers/vouchers.module';

@Module({
	imports: [UsersModule, VouchersModule, PartiesModule, NotificationsModule],
})
export class DomainsModule {}
