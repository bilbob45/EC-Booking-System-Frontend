import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  AddBookingResponse,
  BookingStatus,
  GetBookings,
} from '../services/BookingService';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { BookingsService } from '../services/bookingsservice';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingHistoryComponent implements OnInit {
  @ViewChild('dataTableAuditLogs', { static: true }) dataTable: Table;
  @ViewChild('paginatorAuditLogs', { static: true }) paginator: Paginator;

  activeIndex1: number = 0;
  searchText: string;
  activeIndex2: number = 0;
  dates: Date[];
  emptyState = true;
  cancelEmptyState = true;
  startDate: Date;
  bookings: any;
  pendingBookings: any;
  approvedBookings: any;
  deniedBookings: any;
  cancelledBookings: any;
  constructor(private bookingService: BookingsService) {}

  ngOnInit(): void {
    this.getBookings();
    this.getPendingBookings(1);
    this.getApprovedBookings(2);
    this.getDeniedBookings(3);
    this.getCancelledBookings(4);
  }

  getBookings() {
    this.bookingService.getBookings().subscribe((response) => {
      (this.bookings = response.data), (this.dates = []);
      this.bookings.forEach((x) =>
        this.dates.push(...x.bookedDates.map((x) => x.eventDate))
      );
      console.log(this.dates, 'dates');
      // Storing the last item
      this.startDate = this.dates[this.dates.length - 1];
      console.log(this.startDate, 'all bookings');
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
      if (response.message === 'no bookings with this status') {
        this.emptyState;
      } else if (response.message === 'bookings successfully fetched') {
        this.emptyState = false;
      }
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
      if (response.message === 'no bookings with this status') {
        this.cancelEmptyState;
      } else if (response.message === 'bookings successfully fetched') {
        this.emptyState = false;
      }
    });
  }
  onSelect(): void {
    this.getPendingBookings(1);
  }
}
