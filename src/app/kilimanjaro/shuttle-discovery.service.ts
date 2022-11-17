import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingComponent } from '../booking/booking.component';
import { Booking, GetBookings } from './ShuttleDiscovery';

@Injectable({
  providedIn: 'root',
})
export class ShuttleDiscoveryService {
  getState: any;
  private BASE_URL = environment.API_URL;
  private headers: HttpHeaders;
  token: string;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW5AcHdjLmNvbSIsImp0aSI6IjgzNjVjNWNmLTRkZDUtNDY4NC1hNGQ0LTc1Mzc1Mjg5NmMzMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjY4Njc3NDQ1LCJpc3MiOiJodHRwczovL2VjYm9va2luZ3N5c3RlbTEuYXp1cmV3ZWJzaXRlcy5uZXQiLCJhdWQiOiJodHRwczovL2VjYm9va2luZ3N5c3RlbTEuYXp1cmV3ZWJzaXRlcy5uZXQifQ.dPIVLIegyd1DoX5GNW9JSGn6bnLna5emThEND1ALl9I`,
    });
  }

  getBookings(id: number): Observable<{ data: GetBookings[] }> {
    return this.http.get<{ data: GetBookings[] }>(
      `${this.BASE_URL}/Bookings/getbookings?SpaceId=${id}`,
      { headers: this.headers }
    );
  }

  //createBooking(eventDate: string, time: string, meetingType: string, clientCompanyName: string, engagementLeader: string, numberOfGuests: number, contactNumber: number, internalContactPerson: string,additionalInfo: string, feedingRequirement:boolean): Observable<Booking> {

  createBooking(body: Booking, id: number): Observable<Booking> {
    return this.http.post<Booking>(
      `${this.BASE_URL}/Bookings/addbooking?SpaceId=${id}`,
      body,
      { headers: this.headers }
    );
  }

  cancelBooking(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/bookings/${id}`);
  }
}
