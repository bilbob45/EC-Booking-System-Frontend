import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../../src/app/services/photoservice';
import { BookingsService } from 'src/app/services/bookingsservice';
import {
  AddBookingResponse,
  Booking,
  BookingStatus,
  ReasonForDecline,
} from 'src/app/services/BookingService';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css'],
  providers: [PhotoService],
})
export class BookingDetailComponent implements OnInit {
  images: any[];
  booking: any;
  cancelledBooking: any;
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
  showCancel = true;
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
    private location: Location,
    private bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    this.bookingId = this._route.snapshot.params['id'];

    console.log(this.bookingId);
    this.getBookingsId(this.bookingId);
    this.photoService.getImages().then((images) => {
      this.images = images;
    });
    this.userData = localStorage.getItem('user');
    this.loggedInUser = JSON.parse(this.userData);
    if (this.loggedInUser?.role === 'User') {
      this.showApproval = false;
      this.showCancel = true;
    }
    if (this.loggedInUser?.role === 'Admin') {
      this.showApproval = false;
      this.showCancel = true;
    }
    if (this.loggedInUser?.role === 'Approver') {
      this.showApproval;
      this.showCancel = false;
    }
  }
  backCick() {
    this.location.back();
  }
  approveBooking(bookingId: string) {
    this.bookingsService
      .approveBooking(bookingId)
      .subscribe((response: Booking) => {
        window.location.reload();
        this.displayModalApprove = false;
     
      });
  }
  declineBooking(bookingId: string) {
    let payload: ReasonForDecline = this.declineForm.value;
    this.bookingsService
      .declineBooking(bookingId, payload)
      .subscribe((response: AddBookingResponse) => {
        if (response.success) {
          window.location.reload();
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
          window.location.reload();
          this.displayModalDecline = false;
        }
        this.cancelledBooking = response?.data;

      });
  }


  getBookingsId(bookingId: string) {
    this.bookingsService.getBookingsById(bookingId).subscribe({
      next: (res) => {
        this.booking = res?.data;
        switch (this.booking?.status) {
          case 1:
            this.bookingStatus = 'Awaiting Approval';
            this.showCancel;

            break;
          case 2:
            this.bookingStatus = 'Approved';
            this.showCancel = false;
            this.showApproval = false;
            break;
          case 3:
            this.bookingStatus = 'Declined';
            this.showCancel = false;
            this.showApproval = false;
            break;
          case 4:
            this.bookingStatus = 'Cancelled';
            this.showCancel = false;
            this.showApproval = false;
            break;
          default:
            this.bookingStatus = 'Awaiting Approval';
            this.showCancel = true;
        }
      },
    });
  }
}
