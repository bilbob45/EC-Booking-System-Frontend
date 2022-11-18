import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
interface Venue {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // model: NgbDateStruct | any;
  // model: NgbDateStruct;
  // date: { year: number; month: number };

  // constructor(private calendar: NgbCalendar) {}

  // selectToday() {
  // 	this.model = this.calendar.getToday();

  // }
  images: any[];
  title: string = 'The Breakroom';
  titles: string[] = ['Kilimanjaro', 'The Coliseum', 'Shuttle Discovery'];
  description: string =
    'Lorem ipsum dolor sit amet, conseelers sas adipiscin elit. Donec dolor sit amet, apaisd';
  descriptions: string[] = [
    'Lorem ipsum dolor sit amet, conseelers sas adipiscing elit. Donec dolor sit amet, apaisd',
    'Lorem ipsum dolor sit amet, conseelers sas adipiscing elit. Donec dolor sit amet, apaisd',
    'Lorem ipsum dolor sit amet, conseelers sas adipiscing elit. Donec dolor sit amet, apaisd',
  ];
  slide: string = '../../assets/images/breakroom-slide.svg';
  slides: string[] = [
    '../../assets/images/kilimanjaro-slide.svg',
    '../../assets/images/coliseum-slide.svg',
    '../../assets/images/shuttle-slide.svg',
  ];

  venues: Venue[];

  selectedVenue: Venue;
  date10: Date;
  dates: Date[];

  rangeDates: Date[];

  minDate: Date;

  maxDate: Date;

  es: any;

  invalidDates: Array<Date>;

  items: SelectItem[];

  item: string;
  eventDate: Date;

  constructor(private _router: Router) {
    this.items = [];
    for (let i = 0; i < 10000; i++) {
      this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }

    this.venues = [
      { name: 'The Coliseum' },
      { name: 'Kilimanjaro' },
      { name: 'Shuttle Discovery' },
    ];

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Borrar',
    };

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

  changeImage(e: number) {
    this.slide = this.slides[e];
    this.description = this.descriptions[e];
    this.title = this.titles[e];
  }

  goToRoom() {
    switch (this.selectedVenue.name) {
      case 'The Coliseum':
        this._router.navigate(['/the-coliseum/'], {
          queryParams: { date: this.date10.toISOString() },
        });
        break;
        case 'Shuttle Discovery':
          this._router.navigate(['/shuttle-discovery/'], {
            queryParams: { date: this.date10.toISOString() },
          });
          break;
    }
  }
}
