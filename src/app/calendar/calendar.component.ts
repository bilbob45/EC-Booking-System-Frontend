import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/angular';
import { AddBookingResponse, GetBookings } from '../services/BookingService';

import { BookingsService } from '../services/bookingsservice';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  events: GetBookings[] = [];
  calendarOptions: CalendarOptions | undefined;
  calendarEvents: any[];
  client: any;
  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.bookingsService.getBookings().subscribe((response) => {
      this.events = response.data;
      console.log(this.calendarEvents, 'events');
      this.calendarEvents = [];

      // response.data.forEach((e) => this.calendarEvents.push({spaceName: e.spaceName, }))
      this.calendarEvents = this.events.map((e) => ({
        title:
          e.spaceName +
          '\n' +
          e.clientCompanyName +
          '\n' +
          e.bookedDates[0].time +
          '\n' +
          e.meetingType,
        engagementLeader: e.engagementLeader,
        start: e.bookedDates[0].eventDate,
        end: e.bookedDates[e.bookedDates.length - 1].eventDate,
        time: e.bookedDates[0].time,
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
