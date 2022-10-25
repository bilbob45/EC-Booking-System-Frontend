import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'booking', component: BookingComponent },
  { path: 'report', component: ReportComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'calendar', component: CalendarComponent },
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
];
