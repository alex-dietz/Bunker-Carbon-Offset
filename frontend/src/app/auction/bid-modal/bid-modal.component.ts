import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bid-modal',
  templateUrl: './bid-modal.component.html',
  styleUrls: ['./bid-modal.component.scss']
})
export class BidModalComponent {
  @Input() auction: any;
  bidAmount: any;
  @Input() currentUser: any;
  constructor(public activeModal: NgbActiveModal) {}

  placeBid() {
    //close modal and pass down bidAmount
    this.activeModal.close(this.bidAmount);
  }
}
