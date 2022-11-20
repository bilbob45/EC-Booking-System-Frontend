import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
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
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
        {
            path: 'login',
            component: LoginComponent
        }
    ]
},
{
  path: '',
  component: SiteLayoutComponent,
  children: [
       {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'booking', component: BookingComponent, data: { permission: '' } },
  { path: 'report', component: ReportComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'shuttle-discovery', component: ShuttleDiscoveryComponent },
  { path: 'vr-room', component: VRRoomComponent },
  { path: 'booking-history', component: BookingHistoryComponent },
  { path: 'awaiting-approval/:id', component: AwaitingApprovalComponent },
  { path: 'cancelled', component: CancelledComponent },
  { path: 'denied', component: DeniedComponent },
  { path: 'completed', component: CompletedComponent },
  { path: 'approved', component: ApprovedComponent },
  {
    path: 'approver-awaiting-approval',
    component: ApproverAwaitingApprovalComponent,
  },
  { path: 'the-coliseum', component: TheColiseumComponent },
  { path: 'kilimanjaro', component: KilimanjaroComponent },
   ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  ReportComponent,
  BookingComponent,
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
  LoginComponent
];
