import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { GetBookings } from '../services/BookingService';
import { BookingsService } from '../services/bookingsservice';
import {Router, Activac}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  events: GetBookings[] = [];
  calendarOptions: CalendarOptions | undefined;
  calendarEvents: any[];
  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.bookingsService.getBookings().subscribe((response) => {
      this.events = response.data;
      console.log(this.events, 'events');
      this.calendarEvents = [];
      this.calendarEvents = this.events.map((e) => ({
        title:
          e.spaceName +
          '\n' +
          e.clientCompanyName +
          '\n' +
          e.bookedDates[0].time +
          '\n' +
          e.meetingType,
        start: e.bookedDates[0].eventDate,
        end: e.bookedDates[e.bookedDates.length - 1].eventDate,
      }));
      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        initialView: 'dayGridMonth',
        events: this.calendarEvents, // alternatively, use the `events` setting to fetch from a feed
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
      };
    });
  }
}
