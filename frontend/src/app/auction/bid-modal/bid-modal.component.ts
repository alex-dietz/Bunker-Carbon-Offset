import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bid-modal',
  templateUrl: './bid-modal.component.html',
  styleUrls: ['./bid-modal.component.scss']
})
export class BidModalComponent {
  @Input() auction: any;
  bidAmount: any;
  constructor() {}

  placeBid() {}
}
