import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  display: boolean;
  showMenu = true;
  showSettings = true;
  userData: any;
  loggedInUser: any = null;

  showDialog() {
    this.display = true;
  }
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userData = localStorage.getItem('user');
    this.loggedInUser = JSON.parse(this.userData);
    if (this.loggedInUser?.role === 'User') {
      this.showMenu = false;
      this.showSettings = false;
    }
    if (this.loggedInUser?.role === 'Approver') {
      this.showSettings = false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
