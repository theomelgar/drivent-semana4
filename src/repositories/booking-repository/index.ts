import { prisma } from '@/config';

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({ data: { userId, roomId } });
}

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { userId, roomId },
  });
}

const bookingRepository = {
  createBooking,
  findBookingByUserId,
  updateBooking,
};

export default bookingRepository;
