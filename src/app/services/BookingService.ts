export interface Booking {
  clientCompanyName: string;
  meetingType: string;
  engagementLeader: string;
  internalContactPerson: string;
  contactNumber: number;
  feedingRequirement: string;
  numberOfGuests: number;
  notes: string;
  status: BookingStatus[];
  bookedDates: BookedDates[];
}

export interface AddBookingResponse {
  data: [
    {
      id: string;
      spaceId: number;
      userId: string;
      clientCompanyName: string;
      meetingType: string;
      engagementLeader: string;
      internalContactPerson: string;
      contactNumber: string;
      feedingRequirement: string;
      numberOfGuests: number;
      notes: string;
      status: BookingStatus;
      bookedDates: [
        {
          id: string;
          bookingId: string;
          eventDate: Date;
          time: string;
        }
      ];
    }
  ];
  success: boolean;
  message: string;
}

export interface GetBookings {
  id: string;
  spaceId: number;
  userId: string;
  clientCompanyName: string;
  meetingType: string;
  engagementLeader: string;
  internalContactPerson: string;
  contactNumber: number;
  feedingRequirement: string;
  numberOfGuests: number;
  notes: string;
  status: string;
  bookedDates: BookedDate[];
}

export interface BookedDates {
  eventDate: Date;
  time: string;
}
export interface BookedDate {
  id: string;
  bookingId: string;
  eventDate: Date;
  time: string;
}

export enum BookingStatus {
  awaiting = 1,
  approved = 2,
  declined = 3,
}
