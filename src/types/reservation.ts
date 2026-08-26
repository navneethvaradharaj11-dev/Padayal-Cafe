export type SeatingArea = 'indoor' | 'patio' | 'rooftop';

export interface TableBooking {
  bookingId: string;
  bookingRef: string; // e.g. #RES-9402
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  seatingArea: SeatingArea;
  specialRequests?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}
