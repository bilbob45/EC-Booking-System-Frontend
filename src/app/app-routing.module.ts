import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ShuttleDiscoveryComponent } from './shuttle-discovery/shuttle-discovery.component';
import { VRRoomComponent } from './vr-room/vr-room.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'booking', component: BookingComponent },
  { path: 'report', component: ReportComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'shuttle-discovery', component: ShuttleDiscoveryComponent },
  { path: 'vr-room', component: VRRoomComponent },
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
  HistoryComponent,
  CalendarComponent,
  ReportComponent,
  RoomsComponent,
  ShuttleDiscoveryComponent,
  VRRoomComponent,
];
