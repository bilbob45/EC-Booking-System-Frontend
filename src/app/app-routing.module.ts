import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ShuttleDiscoveryComponent } from './shuttle-discovery/shuttle-discovery.component';
import { VRRoomComponent } from './vr-room/vr-room.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { TheColiseumComponent } from './the-coliseum/the-coliseum.component';
import { KilimanjaroComponent } from './kilimanjaro/kilimanjaro.component';
import { LoginComponent } from './login/login.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      { path: 'report', component: ReportComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'shuttle-discovery', component: ShuttleDiscoveryComponent },
      { path: 'vr-room', component: VRRoomComponent },
      { path: 'booking-history', component: BookingHistoryComponent },
      { path: 'the-coliseum', component: TheColiseumComponent },
      { path: 'kilimanjaro', component: KilimanjaroComponent },
      {
        path: 'booking',
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingModule),
      },
    ],
  },

  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  ReportComponent,
  CalendarComponent,
  ReportComponent,
  RoomsComponent,
  ShuttleDiscoveryComponent,
  VRRoomComponent,
  BookingHistoryComponent,
  TheColiseumComponent,
  KilimanjaroComponent,
  LoginComponent,
  BookingComponent,
  BookingDetailComponent,
];
