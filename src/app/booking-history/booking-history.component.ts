import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookingsService } from '../services/bookingsservice';
import { BookingStatus, GetBookings } from '../services/BookingService';

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingHistoryComponent implements OnInit {
  activeIndex1: number = 0;
  searchText: string;
  activeIndex2: number = 0;
  dates: Date[];
  page = 1;
  booking: GetBookings;
  endDate: Date;
  bookings: GetBookings[];
  pendingBookings: GetBookings[];
  approvedBookings: GetBookings[];
  deniedBookings: GetBookings[];
  cancelledBookings: GetBookings[];
  bookingId: string;
  bookingStatus: string;
  pendingStatus: string;
  approvedStatus: string;
  cancelStatus: string;
  deniedStatus: string;
  statuses: any[];
  pageSize = 10;
  status: BookingStatus;

  constructor(
    private bookingService: BookingsService,
    private _router: Router,
    private location: Location,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBookings();
    this.getPendingBookings(1);
    this.getApprovedBookings(2);
    this.getDeniedBookings(3);
    this.getCancelledBookings(4);
    console.log(this.bookingId);
  }

  getBookings() {
    this.bookingService.getBookings().subscribe((response) => {
      this.bookings = response.data;
    });
  }

  getPendingBookings(status: 1) {
    this.bookingService.getBookingsByStatus(status).subscribe((response) => {
      this.pendingBookings = response.data;
    });
  }

  getApprovedBookings(status: 2) {
    this.bookingService.getBookingsByStatus(status).subscribe((response) => {
      this.approvedBookings = response.data;
    });
  }

  getDeniedBookings(status: 3) {
    this.bookingService.getBookingsByStatus(status).subscribe((response) => {
      this.deniedBookings = response.data;
    });
  }
  getCancelledBookings(status: 4) {
    this.bookingService.getBookingsByStatus(status).subscribe((response) => {
      this.cancelledBookings = response.data;
    });
  }
  clickContinue(id: string) {
    this._router.navigate(['/booking/', id]);
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  backClick() {
    this.location.back();
  }
}
