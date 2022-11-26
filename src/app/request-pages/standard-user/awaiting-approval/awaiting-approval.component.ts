import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../services/photoservice';
import { BookingsService } from 'src/app/services/bookingsservice';
import {
  AddBookingResponse,
  Booking,
  BookingStatus,
  ReasonForDecline,
} from 'src/app/services/BookingService';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-awaiting-approval',
  templateUrl: './awaiting-approval.component.html',
  styleUrls: ['./awaiting-approval.component.css'],
  providers: [PhotoService],
})
export class AwaitingApprovalComponent implements OnInit {
  images: any[];
  booking: any;

  declineForm = this.fb.group({
    comment: ['', Validators.required],
  });

  cancelForm = this.fb.group({
    comment: ['', Validators.required],
  });

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
  comment: ReasonForDecline;
  bookingStatus: string;
  showApproval = true;
  showCancel = false;
  loggedInUser: any = null;
  userData: any;
  showModalDialog() {
    this.displayModal = true;
  }
  displayModalApprove: boolean = false;
  displayModalDecline: boolean = false;

  showApproveModalDialog() {
    this.displayModalApprove = true;
  }
  showDeclineDialog() {
    this.displayModalDecline = true;
  }
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private photoService: PhotoService,
    private fb: FormBuilder,
    private bookingsService: BookingsService
  ) {
    this.bookingId = this._route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getBookingsId(this.bookingId);
    this.photoService.getImages().then((images) => {
      this.images = images;
    });
    this.userData = localStorage.getItem('user');
    this.loggedInUser = JSON.parse(this.userData);
    if (
      this.loggedInUser?.role === 'User' &&
      this.loggedInUser?.role === 'Admin'
    ) {
      this.showApproval = false;
      this.showCancel = true;
    }

    if (this.loggedInUser?.role === 'Approver') {
      this.showApproval;
      this.showCancel;
    }
  }
  approveBooking(bookingId: string) {
    this.bookingsService
      .approveBooking(bookingId)
      .subscribe((response: Booking) => {
        console.log(response, 'approve');
        return this.showApproveModalDialog();
      });
  }
  declineBooking(bookingId: string) {
    let payload: ReasonForDecline = this.declineForm.value;
    this.bookingsService
      .declineBooking(bookingId, payload)
      .subscribe((response: AddBookingResponse) => {
        if (response.success) {
          this._router.navigate(['/denied', bookingId]);
          this.displayModalDecline = false;
        }
      });
  }
  cancelBooking(bookingId: string) {
    let payload: ReasonForDecline = this.cancelForm.value;
    this.bookingsService
      .cancelBooking(bookingId, payload)
      .subscribe((response: AddBookingResponse) => {
        if (response.success) {
          this._router.navigate(['/cancelled', bookingId]);
          this.displayModalDecline = false;
        }
      });
  }
  get(item: any) {
    console.log(item);
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
  clickContinue() {
    this._router.navigate(['/approved', this.bookingId]);
  }
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
