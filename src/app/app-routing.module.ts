import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ShuttleDiscoveryComponent } from './shuttle-discovery/shuttle-discovery.component';
import { VRRoomComponent } from './vr-room/vr-room.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { AwaitingApprovalComponent } from './request-pages/standard-user/awaiting-approval/awaiting-approval.component';
import { CancelledComponent } from './request-pages/standard-user/cancelled/cancelled.component';
import { DeniedComponent } from './request-pages/standard-user/denied/denied.component';
import { CompletedComponent } from './request-pages/standard-user/completed/completed.component';
import { ApprovedComponent } from './request-pages/standard-user/approved/approved.component';
import { ApproverAwaitingApprovalComponent } from './request-pages/approver/approver-awaiting-approval/approver-awaiting-approval.component';
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
      { path: 'awaiting-approval/:id', component: AwaitingApprovalComponent },
      { path: 'cancelled/:id', component: CancelledComponent },
      { path: 'denied/:id', component: DeniedComponent },
      { path: 'completed/:id', component: CompletedComponent },
      { path: 'approved/:id', component: ApprovedComponent },
      { path: 'booking', component: BookingComponent },
      {
        path: 'approver-awaiting-approval',
        component: ApproverAwaitingApprovalComponent,
      },
      { path: 'the-coliseum', component: TheColiseumComponent },
      { path: 'kilimanjaro', component: KilimanjaroComponent },
      { path: 'booking-detail', component: BookingDetailComponent },
    ],
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingModule),
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
  AwaitingApprovalComponent,
  CancelledComponent,
  DeniedComponent,
  CompletedComponent,
  ApprovedComponent,
  ApproverAwaitingApprovalComponent,
  TheColiseumComponent,
  KilimanjaroComponent,
  LoginComponent,
  BookingComponent,
  BookingDetailComponent,
];
