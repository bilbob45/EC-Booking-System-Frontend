export interface Booking {
  clientCompanyName: string;
  meetingType: string;
  engagementLeader: string;
  internalContactPerson: string;
  contactNumber: number;
  feedingRequirement: string;
  numberOfGuests: number;
  notes: string;
  bookedDates: BookedDates[];
}

export interface GetBookings {
  id: string;
  spaceId: number;
  clientCompanyName: string;
  meetingType: string;
  engagementLeader: string;
  internalContactPerson: string;
  contactNumber: number;
  feedingRequirement: string;
  numberOfGuests: number;
  notes: string;
  status: string  ;
  bookedDates: BookedDate[];
}

export interface BookedDates {
  eventDate: Date;
  time: string;
}
 export interface BookedDate {
  id:string;
  bookingId:string;
  eventDate: Date;
  time: string;
 }