import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsService from '@/services/booking-service';

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  const { roomId } = req.body as { roomId: number };

  try {
    const { booking } = await bookingsService.createBooking(userId, roomId);

    res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    next(error);
  }
}
export async function findBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };

  try {
    const { id, Room } = await bookingsService.findBooking(userId);

    res.status(httpStatus.OK).send({ id, Room });
  } catch (error) {
    next(error);
  }
}
export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  const { bookingId } = req.params;
  const { roomId } = req.body as { roomId: number };

  try {
    const { newBooking } = await bookingsService.updateBooking(userId, Number(bookingId), roomId);

    res.status(httpStatus.OK).send({ bookingId: newBooking.id });
  } catch (error) {
    next(error);
  }
}
