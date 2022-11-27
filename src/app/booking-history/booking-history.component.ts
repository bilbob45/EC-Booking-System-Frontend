import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  AddBookingResponse,
  BookingStatus,
  GetBookings,
} from '../services/BookingService';
import { ActivatedRoute, Router } from '@angular/router';

import { TabDirective } from 'ngx-bootstrap/tabs';
import { BookingsService } from '../services/bookingsservice';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';

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
  page = 4;
  booking: any;
  endDate: Date;
  bookings: any[] = [];
  pendingBookings: any[];
  approvedBookings: any[];
  deniedBookings: any[];
  cancelledBookings: any[];
  bookingId: string;

  constructor(
    private bookingService: BookingsService,
    private _router: Router,
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
      (this.bookings = response.data), (this.dates = []);
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
    this._router.navigate(['/bookings/', id]);
  }

  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
