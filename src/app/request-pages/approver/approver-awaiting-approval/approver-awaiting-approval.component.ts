import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photoservice';

@Component({
  selector: 'app-approver-awaiting-approval',
  templateUrl: './approver-awaiting-approval.component.html',
  styleUrls: ['./approver-awaiting-approval.component.css'],
  providers: [PhotoService],
})
export class ApproverAwaitingApprovalComponent implements OnInit {
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
  displayModalApprove: boolean = false;
  displayModalDecline: boolean = false;

  showModalDialog() {
    this.displayModalApprove = true;
  }
  showDeclineDialog() {
    this.displayModalDecline = true;
  }
  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getImages().then((images) => {
      this.images = images;
    });
  }
}
