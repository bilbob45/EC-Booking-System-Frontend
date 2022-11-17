import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photoservice';
@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.css'],
  providers: [PhotoService],
})
export class DeniedComponent implements OnInit {
  images: any[];
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

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getImages().then((images) => {
      this.images = images;
    });
  }
}
