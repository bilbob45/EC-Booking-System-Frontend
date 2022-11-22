import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AddBookingResponse, GetBookings } from '../services/BookingService';
import { BookingsService } from '../services/bookingsservice';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from './PrimengTableHelper';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingHistoryComponent implements OnInit {
  @ViewChild('dataTableAuditLogs', { static: true }) dataTable: Table;
  @ViewChild('paginatorAuditLogs', { static: true }) paginator: Paginator;

  primengTableHelper = new PrimengTableHelper();
  activeIndex1: number = 0;

  activeIndex2: number = 0;
  bookings: any;
  constructor(private bookingService: BookingsService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getBookings().subscribe((response) => {
      return (
        (this.bookings = response.data), console.log(response, 'all bookings')
      );
    });
  }
  getAuditLogs(event?: LazyLoadEvent) {
    this.primengTableHelper.showLoadingIndicator();
  }
}
