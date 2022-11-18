import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../services/photoservice';
import { BookingsService } from 'src/app/services/bookingsservice';
import { GetBookings } from 'src/app/services/BookingService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-awaiting-approval',
  templateUrl: './awaiting-approval.component.html',
  styleUrls: ['./awaiting-approval.component.css'],
  providers: [PhotoService],
})
export class AwaitingApprovalComponent implements OnInit {
  images: any[];
  bookings: GetBookings[] = [];
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

  showModalDialog() {
    this.displayModal = true;
  }

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private bookingsService: BookingsService
  ) {

  }

  ngOnInit(): void {
    this.photoService.getImages().then((images) => {
      this.images = images;
      this.getBookingsId('EC/EB/2022-11-17:13-37-23-100');
    });
  }
  // getBookings(id: number) {
  //   this.bookingsService.getBookings(id).subscribe((response) => {
  //     return (
  //       (this.bookings = response.data), console.log(this.bookings, 'bookings')
  //     );
  //   });
  // }

  getBookingsId(bookingId: string) {
    this.bookingsService.getBookingsById(bookingId).subscribe((response) => {
      return (
        (this.bookings = response.data), console.log(this.bookings, 'bookings')
      );
    });
  }
}
