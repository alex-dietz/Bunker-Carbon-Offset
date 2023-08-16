import { Component } from '@angular/core';
import { AuctionService } from '../core/auction.service';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent {
  auctions: any[] = [];
  currentUser: any;
  constructor(private auctionService: AuctionService, private userService: UserService) {
    this.auctionService.getAuctions().subscribe((auctions: any) => {
      this.auctions = auctions;
    });
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
    });
  }
}
