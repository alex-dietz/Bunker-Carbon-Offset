import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  auctions: any = [];
  auctions$: any;
  sampleAuction = {
    duration: 10,
    fuelType: 'diesel',
    fuelAmount: 20,
    carbonEmission: 160,
    carbonOffsetPercentage: 0.5,
    status: 'open',
    carbonOffset: 80,
    owner: {
      id: 2,
      username: 'buyer456',
      role: 'buyer'
    },
    bids: []
  };
  currentUser: any;
  constructor(private userService: UserService) {
    this.auctions$ = new BehaviorSubject<any>(null);
    this.auctions = [this.sampleAuction];
    this.auctions$.next(this.auctions);
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
    });
  }
  placeBid(auction: any, bidAmount: any) {
    this.auctions[0].bids.push({
      bidder: this.currentUser,
      bidAmount: bidAmount
    });
    //sort bids in descending order
    this.auctions[0].bids.sort((a: any, b: any) => {
      return a.bidAmount - b.bidAmount;
    });
    this.auctions$.next(this.auctions);
  }

  createNewAuction(auction: any) {
    this.auctions.push(auction);
  }
  getAuctions() {
    return this.auctions$.asObservable();
  }
}
