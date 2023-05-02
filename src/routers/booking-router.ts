import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createBooking, findBooking, updateBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', findBooking)
  .post('/', createBooking)
  .put('/:bookingId', updateBooking);

export { bookingRouter };
