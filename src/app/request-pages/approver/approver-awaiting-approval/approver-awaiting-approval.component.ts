import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photoservice';
import { BookingsService } from 'src/app/services/bookingsservice';
import { GetBookings, Booking } from 'src/app/services/BookingService';
@Component({
  selector: 'app-approver-awaiting-approval',
  templateUrl: './approver-awaiting-approval.component.html',
  styleUrls: ['./approver-awaiting-approval.component.css'],
  providers: [PhotoService],
})
export class ApproverAwaitingApprovalComponent implements OnInit {
  images: any[];
  approveBookings: Booking[];
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
  displayModalApprove: boolean = false;
  displayModalDecline: boolean = false;
  bookingsService: any;

  showModalDialog() {
    this.displayModalApprove = true;
  }
  showDeclineDialog() {
    this.displayModalDecline = true;
  }
  constructor(
    private photoService: PhotoService,
    bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    this.photoService.getImages().then((images) => {
      this.images = images;
      this.approveBooking('EC/EB/2022-11-17:13-37-23-100');
    });
  }

  approveBooking(bookingId: string) {
    this.bookingsService
      .approveBookings(bookingId)
      .subscribe((response: Booking) => {
        return console.log(response, 'approve');
      });
  }
}
