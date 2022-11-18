import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../services/photoservice';
import { BookingsService } from 'src/app/services/bookingsservice';
import {
  AddBookingResponse,
  BookingStatus,
} from 'src/app/services/BookingService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-awaiting-approval',
  templateUrl: './awaiting-approval.component.html',
  styleUrls: ['./awaiting-approval.component.css'],
  providers: [PhotoService],
})
export class AwaitingApprovalComponent implements OnInit {
  images: any[];
  booking: any;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  displayModal: boolean = false;
  bookingId: string;
  bookingStatus: string;

  showModalDialog() {
    this.displayModal = true;
  }

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private bookingsService: BookingsService
  ) {
    this.bookingId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log(this.bookingId, 'ID');

    this.photoService.getImages().then((images) => {
      this.images = images;
      this.getBookingsId(this.bookingId);
    });
  }
  // getBookings(id: number) {
  //   this.bookingsService.getBookings(id).subscribe((response) => {
  //     return (
  //       (this.bookings = response.data), console.log(this.bookings, 'bookings')
  //     );
  //   });
  // }

  // getBookingsId(bookingId: string) {
  //   this.bookingsService.getBookingsById(bookingId).subscribe((response) => {
  //     return (
  //       (this.booking = response.data), console.log(this.booking, 'bookings')
  //     );
  //   });
  // }

  getBookingsId(bookingId: string) {
    this.bookingsService.getBookingsById(bookingId).subscribe({
      next: (res) => {
        this.booking = res?.data;

        switch (this.booking?.status) {
          case 1:
            this.bookingStatus = 'Awaiting Approval';
            break;
          case 2:
            this.bookingStatus = 'Approved';
            break;
          case 3:
            this.bookingStatus = 'Denied';
            break;
          default:
            this.bookingStatus = 'Awaiting Approval';
        }
      },
    });
  }
}
