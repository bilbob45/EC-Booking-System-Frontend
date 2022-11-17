import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../services/photoservice';
import { ShuttleDiscoveryService } from 'src/app/shuttle-discovery/shuttle-discovery.service';
import { GetBookings } from 'src/app/shuttle-discovery/ShuttleDiscovery';

@Component({
  selector: 'app-awaiting-approval',
  templateUrl: './awaiting-approval.component.html',
  styleUrls: ['./awaiting-approval.component.css'],
  providers: [PhotoService],
})
export class AwaitingApprovalComponent implements OnInit {
  images: any[];
  bookings: GetBookings[];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  displayModal: boolean = false;

  showModalDialog() {
    this.displayModal = true;
  }

  constructor(
    private photoService: PhotoService,
    private shuttleDiscoveryService: ShuttleDiscoveryService
  ) {}

  ngOnInit(): void {
    this.photoService.getImages().then((images) => {
      this.images = images;
      this.getBookings(2);
    });
  }
  getBookings(id: number) {
    this.shuttleDiscoveryService.getBookings(id).subscribe((response) => {
      return (this.bookings = response.data), console.log(response, 'bookings');
    });
  }
}
