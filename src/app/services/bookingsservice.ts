import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AddBookingResponse,
  BookedDates,
  Booking,
  BookingStatus,
  GetBookings,
  Login,
  LoginResponse,
  NotificationResponse,
  ReasonForDecline,
} from '../services/BookingService';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  getState: any;
  private BASE_URL = environment.API_URL;
  private headers: HttpHeaders;
  private http: HttpClient;
  userData = localStorage.getItem('user');
  user = JSON.parse(this.userData);
  token: any;
  constructor(httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
    this.token = this.user.token;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${this.token}`,
    });
  }

  getBookings(id?: number): Observable<{ data: GetBookings[] } | undefined> {
    return this.http.get<{ data: GetBookings[] }>(
      `${this.BASE_URL}/Bookings/getbookings`,
      { headers: this.headers }
    );
  }
  getBookingsById(
    bookingId: string
  ): Observable<AddBookingResponse | undefined> {
    return this.http.get<AddBookingResponse>(
      `${this.BASE_URL}/Bookings/getbookingbyId?BookingId=${bookingId}`,
      { headers: this.headers }
    );
  }
  getBookingsByStatus(
    status: BookingStatus
  ): Observable<{ data: GetBookings[] }> {
    return this.http.get<{ data: GetBookings[] }>(
      `${this.BASE_URL}/Bookings/getbookingsbystatus?status=${status}`,
      { headers: this.headers }
    );
  }
  approveBooking(bookingId: string, body?: Booking): Observable<Booking> {
    return this.http.put<Booking>(
      `${this.BASE_URL}/Bookings/approvebooking?BookingId=${bookingId}`,
      body,
      { headers: this.headers }
    );
  }

  declineBooking(
    bookingId: string,
    body?: ReasonForDecline
  ): Observable<AddBookingResponse> {
    return this.http.put<AddBookingResponse>(
      `${this.BASE_URL}/Bookings/declinebooking?BookingId=${bookingId}`,
      body,
      { headers: this.headers }
    );
  }

  cancelBooking(
    bookingId: string,
    body?: ReasonForDecline
  ): Observable<AddBookingResponse> {
    return this.http.put<AddBookingResponse>(
      `${this.BASE_URL}/Bookings/cancelbooking?BookingId=${bookingId}`,
      body,
      { headers: this.headers }
    );
  }
  getBookedDatesBySpaceId(
    spaceId: number
  ): Observable<{ data: BookedDates[] }> {
    return this.http.get<{ data: BookedDates[] }>(
      `${this.BASE_URL}/Spaces/getbookeddatesbyspaceid?SpaceId=${spaceId}`,
      { headers: this.headers }
    );
  }
  //createBooking(eventDate: string, time: string, meetingType: string, clientCompanyName: string, engagementLeader: string, numberOfGuests: number, contactNumber: number, internalContactPerson: string,additionalInfo: string, feedingRequirement:boolean): Observable<Booking> {

  createBooking(body: Booking, id: number): Observable<AddBookingResponse> {
    return this.http.post<AddBookingResponse>(
      `${this.BASE_URL}/Bookings/addbooking?SpaceId=${id}`,
      body,
      { headers: this.headers }
    );
  }
  login(body: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.BASE_URL}/Accounts/login
      `,
      body,
      { headers: this.headers }
    );
  }

  getNotification(
    id?: number
  ): Observable<{ data: NotificationResponse[] } | undefined> {
    return this.http.get<{ data: NotificationResponse[] }>(
      `${this.BASE_URL}/Notification/getnotifications`,
      { headers: this.headers }
    );
  }
  readNotification(
    id?: number
  ): Observable<{ data: NotificationResponse[] } | undefined> {
    return this.http.put<{ data: NotificationResponse[] }>(
      `${this.BASE_URL}/Notification/readnotification?id=${id}`,
      { headers: this.headers }
    );
  }
  clearNotification(
    id?: number
  ): Observable<{ data: NotificationResponse[] } | undefined> {
    return this.http.delete<{ data: NotificationResponse[] }>(
      `${this.BASE_URL}/Notification/deletenotification`,
      { headers: this.headers }
    );
  }
}
