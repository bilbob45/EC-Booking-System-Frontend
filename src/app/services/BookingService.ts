export class Booking {
  clientCompanyName: string;
  meetingType: string;
  engagementLeader: string;
  internalContactPerson: string;
  contactNumber: number;
  feedingRequirement: string;
  comment: string;
  numberOfGuests: number;
  notes: string;
  status: BookingStatus[];
  bookedDates: BookedDates[];
}

export class AddBookingResponse {
  [x: string]: any;
  data: [
    {
      id: string;
      spaceId: number;
      spaceName: string;
      userId: string;
      createdAt: Date;
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

export interface Login {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  data: any;
  success: boolean;
  message: string;
}
export class GetBookings {
  id: string;
  spaceId: number;
  spaceName: string;
  userId: string;
  createdAt: Date;
  clientCompanyName: string;
  meetingType: string;
  engagementLeader: string;
  internalContactPerson: string;
  contactNumber: number;
  feedingRequirement: string;
  comment: string;
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
  success: boolean;
  message: string;
}

export class BookedDates {
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
  cancelled = 4,
}

export interface ReasonForDecline {
  comment?: string;
}

export class NotificationResponse{
  id: number;
  userId: string;
  createdAt: Date;
  title: string;
  message: string;
}