import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationResponse } from '../services/BookingService';
import { BookingsService } from '../services/bookingsservice';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  display: boolean;
  showMenu = true;
  showSettings = true;
clearAll = true;
  userData: any;
  loggedInUser: any = null;

  notifications: NotificationResponse[] | null;
  showDialog() {
    this.display = true;
  }
  constructor(
    private router: Router,
    private bookingService: BookingsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getNotification();
    this.userData = localStorage.getItem('user');
    this.loggedInUser = JSON.parse(this.userData);
    if (this.loggedInUser?.role === 'User') {
      this.showMenu = false;
      this.showSettings = false;
    }
    if (this.loggedInUser?.role === 'Approver') {
      this.showSettings = false;
    }
    if (this.loggedInUser?.role === 'Admin') {
      this.showSettings = true;
    }
  }

  getNotification() {
    this.bookingService.getNotification().subscribe((response) => {
      this.notifications = response.data;
      this.clearAll = false;
      console.log(this.notifications, 'notify');
    });
  }
  clickView(id: string) {
    this.router.navigate(['/booking/', id]);
  }
  clearNotification() {
    this.bookingService.clearNotification().subscribe((response) => {
      this.notifications = response.data;
      this.clearAll;
      // if (response) {
      //   this.notifications === null;
      // }

      console.log(this.notifications, 'clear');
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }
}
