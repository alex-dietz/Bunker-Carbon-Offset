import { Component } from '@angular/core';
import { AuctionService } from '../core/auction.service';
import { UserService } from '../core/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BidModalComponent } from './bid-modal/bid-modal.component';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent {
  auctions: any[] = [];
  currentUser: any;
  constructor(private auctionService: AuctionService, private userService: UserService, private modalService: NgbModal) {
    this.auctionService.getAuctions().subscribe((auctions: any) => {
      console.log(auctions);
      this.auctions = auctions;
    });
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  openBidModal(auction: any) {
    //open BidModalComponent
    let modalRef = this.modalService.open(BidModalComponent, { centered: true, scrollable: true, size: 'md' });
    modalRef.componentInstance.auction = auction;
    modalRef.closed.subscribe((res) => {
      console.log(res);
    });
  }
}
