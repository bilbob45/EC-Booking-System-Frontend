import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  activeIndex1: number = 0;

  activeIndex2: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  

  }

}
