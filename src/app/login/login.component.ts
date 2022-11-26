import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Login } from '../services/BookingService';
import { BookingsService } from '../services/bookingsservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [BookingsService],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingsService,

    private router: Router
  ) {}

  ngOnInit(): void {}

  // showSuccess() {
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Success',
  //     detail: 'User is logged in',
  //     sticky: true,
  //   });
  // }

  login() {
    let payload: Login = this.loginForm.value;
    this.bookingService.login(payload).subscribe((response) => {
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.router.navigate(['/']);
        // console.log(response.data, 'response');
      }
    });
    // console.log(login, 'login');
  }
}
