import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { BookingsService } from '../services/bookingsservice';

import { he } from 'date-fns/locale';
import * as signalR from '@microsoft/signalr';
interface Venue {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HubConnectionBuilder],
})
export class HomeComponent implements OnInit {
  private headers: HttpHeaders;
  private http: HttpClient;
  userId: string;
  images: any[];
  title: string = 'The Breakroom';
  titles: string[] = ['Kilimanjaro', 'The Coliseum', 'Shuttle Discovery'];
  description: string =
    'Relax, converse, eat, and chill in our kitchenette area appropriately named Top up n’ chill. ';
  descriptions: string[] = [
    'Our glorious 12-man meeting room called appropriately named after the highest point in Africa.',
    'A space created to spark creativity, knowledge, and instill the importance of community.',
    'A space ship themed Demo lab & Alternate reality room aptly named Shuttle Discovery after the NASA space',
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
  notifications: any[] = [];
  item: string;
  eventDate: Date;
  userData = localStorage.getItem('user');
  user = JSON.parse(this.userData);
  token: any;
  private hubConnectionBuilder: HubConnection;
  constructor(
    private _router: Router,
    httpBackend: HttpBackend,
    private bookingsService: BookingsService
  ) {
    this.token = this.user.token;
    this.http = new HttpClient(httpBackend);
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
  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl(
        'https://ecbookingsystem1.azurewebsites.net/api/Accounts/testpostingbysignalr',
        { accessTokenFactory: () => this.token }
        // {
        //   // "Foo: Bar" will not be sent with WebSockets or Server-Sent Events requests
        //   headers: {
        //     'Content-Type': 'application/json; charset=utf-8',
        //     'Access-Control-Allow-Origin': '*',
        //     Authorization: `Bearer ${this.token}`,
        //   },
        //   transport: signalR.HttpTransportType.LongPolling,
        // }
      )

      .configureLogging(LogLevel.Information)
      .build();
    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection Started'))
      .catch((err) => console.log('Error while connecting'));
    this.hubConnectionBuilder.on('BroadcastMessage', (result: any) => {
      this.notifications.push(result);
    });
  }

  changeImage(e: number) {
    this.slide = this.slides[e];
    this.description = this.descriptions[e];
    this.title = this.titles[e];
  }

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
  goToRoom() {
    switch (this.selectedVenue.name) {
      case 'The Coliseum':
        this._router.navigate(['/booking/'], {
          queryParams: { date: this.date10.toISOString() },
        });
        break;
      case 'Shuttle Discovery':
        this._router.navigate(['/booking/'], {
          queryParams: { date: this.date10.toISOString() },
        });
        break;
    }
  }
}
