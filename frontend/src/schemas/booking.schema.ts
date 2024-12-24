import { User } from '@/schemas/user.schema';
import { Payment } from '@/schemas/payment.schema';
import { Party } from '@/schemas/party.schema';

export interface Booking {
  _id: string;
  user: User;
  party?: Party[];
  guestCount: number;
  status: 'PENDING' | 'APPROVED' | 'CANCELLED';
  payment: Payment;
  organizeDate?: Date;
  organizeAt: string;
  createdAt?: Date;
  updatedAt?: Date;
}
