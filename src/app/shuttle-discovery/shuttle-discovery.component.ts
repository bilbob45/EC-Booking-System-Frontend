import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photoservice';
import { SelectItem } from 'primeng/api';
interface Venue {
  name: string;
}
interface TimeSlot {
  time: string;
}
@Component({
  selector: 'app-shuttle-discovery',
  templateUrl: './shuttle-discovery.component.html',
  styleUrls: ['./shuttle-discovery.component.css'],
  providers: [PhotoService],
})
export class ShuttleDiscoveryComponent implements OnInit {
  images: any[];
  val:string;
  value1: any;
  venues: Venue[];
  timeSlots: TimeSlot[];
  items: SelectItem[];
  selectedVenue: Venue;
  item: string;
  value2: any;
  value8: any;
  date5: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  invalidDates: Array<Date>;
  checked1: boolean = false;
  checked2: boolean = true;
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

  constructor(private photoService: PhotoService) {
    this.items = [];
    for (let i = 0; i < 10000; i++) {
      this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }

    this.venues = [
      { name: 'The Coliseum' },
      { name: 'Kilimanjaro' },
      { name: 'Shuttle Discovery' },
    ];
    this.timeSlots = [
      { time: 'Morning (9:00am - 12:00noon)' },
      { time: 'Afternon (1:00pm - 4:00pm)' },
      { time: 'Full Day (9:00am - 4:00pm)' },
    ];
  }

  ngOnInit(): void {
    this.photoService.getImages().then((images) => {
      this.images = images;
    });

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

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }
}
