import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photoservice';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookingsService } from '../services/bookingsservice';
import { MessageService } from 'primeng/api';
import { Booking } from '../services/BookingService';
import { DatePipe } from '@angular/common';

interface Venue {
  name: string;
}
interface MeetingType {
  name: string;
}
interface TimeSlot {
  time: string;
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [DatePipe, MessageService],
})
export class BookingComponent implements OnInit {
  selectedRoom: number = 1;
  public successMsg: string;
  public errorMsg: string;
  public _id: string;
  public meetingType: string;
  public clientCompanyName: string;
  public engagementLeader: string;
  public eventDate: Date;
  public time: string;
  public numberOfGuests: number;
  public internalContactPerson: string;
  public contactNumber: string;
  public notes: string;
  public feedingRequirement: string;
  images: any[];
  val: string;
  value1: any;
  meetingTypes: MeetingType[];
  venues: Venue[];
  timeSlots: TimeSlot[] = [];
  bookingForm: FormGroup;
  items: SelectItem[];
  selectedVenue: Venue;
  item: string;
  value2: any;
  value8: any;

  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  dateQuery: any;
  es: any;
  queryDate: Date;
  invalidDates: Array<Date>;
  checked1: boolean = false;
  checked2: boolean = true;
  homeDate: any;
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

  constructor(
    private photoService: PhotoService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private _router: Router,
    private activatedRouter: ActivatedRoute,
    private bookingsService: BookingsService
  ) {
    this.items = [];
    for (let i = 0; i < 10000; i++) {
      this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }

    // this.activatedRouter.queryParams.subscribe(
    //   data=>this.queryParams.eventDate = data.eventDate
    // )
    this.meetingTypes = [
      { name: 'Client Meeting' },
      { name: 'BU Meeting' },
      { name: 'Partner Meeting' },
      { name: 'Training' },
      { name: 'Other Events' },
    ];
    this.venues = [
      { name: 'Shuttle Discovery' },
      { name: 'The Coliseum' },
      { name: 'Kilimanjaro' },
    ];
    this.timeSlots = [
      { time: 'Morning (9:00am - 12:00noon)' },
      { time: 'Afternoon (1:00pm - 4:00pm)' },
      { time: 'Full Day (9:00am - 4:00pm)' },
    ];
    this.bookingForm = this.fb.group({
      meetingType: ['', Validators.required],
      clientCompanyName: ['', Validators.required],
      engagementLeader: ['', Validators.required],
      numberOfGuests: [0, Validators.required],
      internalContactPerson: ['', Validators.required],
      contactNumber: ['', Validators.required],
      notes: ['', Validators.required],
      feedingRequirement: ['', Validators.required],
      bookedDates: this.fb.array([]),
    });

    this.dateQuery = new Date(
      this.activatedRouter.snapshot.queryParamMap.get('date')
    );
    // let newDate = filter;
    // this.activatedRouter.queryParams.subscribe(() => {
    //   this.homeDate = this.datePipe.transform(newDate, 'dd/MM/yyyy');
    //   console.log(this.homeDate, 'homeDate');
    // });
  }

  ngOnInit(): void {
    this.photoService.getImages().then((images) => {
      this.images = images;
      this.getBookedDates(1);
      console.log(this.dateQuery);
    });
    // const filter = this.activatedRouter.snapshot.queryParamMap.get('date');
    // let newDate = filter;
    // this.activatedRouter.queryParams.subscribe(() => {
    //   this.homeDate = this.datePipe.transform(newDate, 'dd/MM/yyyy');
    //   console.log(this.homeDate, 'homeDate');
    // });
    if (this.homeDate) {
      this.addHomeModel();
    } else {
      this.addDate();
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    // let invalidDate = new Date();
    // invalidDate.setDate(today.getDate() - 1);
    // this.invalidDates = [today, invalidDate];
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Booking has been created',
      sticky: true,
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Booking has not been created',
    });
  }
  newDateModel(): FormGroup {
    return this.fb.group({
      eventDate: Date,
      time: '',
    });
  }
  homeDateModel(): FormGroup {
    return this.fb.group({
      eventDate: (Date = this.homeDate),
      time: '',
    });
  }

  DateModels(): FormArray {
    return this.bookingForm.get('bookedDates') as FormArray;
  }
  addHomeModel() {
    this.DateModels().push(this.newDateModel());
  }

  addDate() {
    this.DateModels().push(this.newDateModel());
  }

  removeDate(i: number) {
    this.DateModels().removeAt(i);
  }

  // save(): void {

  // }
  getBookedDates(id: number) {
    this.bookingsService.getBookings(id).subscribe((response) => {
      this.invalidDates = [];
      response.data.forEach((x) =>
        this.invalidDates.push(
          ...x['bookedDates'].map((x) => new Date(x.eventDate))
        )
      );
      // console.log(this.invalidDates, 'invalid dates');
    });
  }
  submitted = false;

  onSubmit(selectedRoom: number) {
    this.submitted = true;
  }

  createBooking(spaceId: number) {
    this.successMsg = '';
    this.errorMsg = '';
    this.submitted = true;
    const t = this.bookingForm.value;
    for (let i = 0; i < t.bookedDates.length; i++) {
      let originalDate = t.bookedDates[i].eventDate;
      t.bookedDates[i].eventDate = this.datePipe.transform(
        originalDate,
        'dd/MM/yyyy'
      );
    }
    console.log(t.bookedDates, 'date');

    //let phoneNumber=this.contactNumber.toString()
    this.bookingsService.createBooking(t, spaceId).subscribe(
      (res) => {
        this.showSuccess();
        console.log(this.showSuccess, 'response');
        this._router.navigate(['/awaiting-approval', res.data[0].id]);
        console.log(res.data[0].id, 'res');
        this.reset();
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.message;
        this.showError();
      }
    );
  }
  reset() {
    this.meetingType = '';
    this.clientCompanyName = '';
    this.internalContactPerson = '';
    this.numberOfGuests = 0;
    this.engagementLeader = '';
    this.eventDate = new Date();
    this.time = '';
    this.contactNumber = '';
    this.notes = '';
    this.feedingRequirement = '';
  }

  goToRoom() {
    switch (this.selectedVenue.name) {
      case 'The Coliseum':
        this._router.navigate(['/the-coliseum/'], {});
        break;
      case 'Shuttle Discovery':
        this._router.navigate(['/shuttle-discovery/'], {});
        break;
    }
  }
}
