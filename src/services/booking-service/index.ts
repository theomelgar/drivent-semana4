import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import hotelRepository from '@/repositories/hotel-repository';
import { forbiddenError, notFoundError } from '@/errors';

async function validateEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByUserId(userId);
  if (!ticket) throw notFoundError();

  const isValidTicket = ticket.status === 'PAID' && !ticket.TicketType.isRemote && ticket.TicketType.includesHotel;

  if (!isValidTicket) throw forbiddenError();

  return;
}

async function createBooking(userId: number, roomId: number) {
  await validateEnrollmentAndTicket(userId);

  const room = await hotelRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  if (room.capacity <= room.Booking.length) throw forbiddenError();

  const booking = await bookingRepository.createBooking(userId, roomId);

  return { booking };
}

async function findBooking(userId: number) {
  await validateEnrollmentAndTicket(userId);

  const booking = await bookingRepository.findBookingByUserId(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  await validateEnrollmentAndTicket(userId);

  const room = await hotelRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  if (room.capacity <= room.Booking.length) throw forbiddenError();

  const booking = await bookingRepository.findBookingByUserId(userId);
  if (!booking || booking.id !== bookingId) throw forbiddenError();

  const newBooking = await bookingRepository.updateBooking(userId, bookingId, roomId);

  return { newBooking };
}

const bookingService = {
  createBooking,
  findBooking,
  updateBooking,
};

export default bookingService;
