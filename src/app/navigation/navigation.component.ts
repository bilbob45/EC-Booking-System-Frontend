import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationResponse,
  NotificationStatus,
} from '../services/BookingService';
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
  readNotification: NotificationResponse[];
  loggedInUser: any = null;
  clearNotifications: NotificationResponse[];
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

  readNotifications(id: number) {
    this.bookingService.readNotification(id).subscribe((response) => {
      this.readNotification = response.data;
    });
  }
  clearNotification() {
    this.bookingService.clearNotification().subscribe((response) => {
      this.clearNotifications = response.data;
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
