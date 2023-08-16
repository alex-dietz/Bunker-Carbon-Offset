import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    owner: {
      id: 2,
      username: 'buyer456',
      role: 'buyer'
    },
    bids: []
  };
  constructor() {
    this.auctions$ = new BehaviorSubject<any>(null);
    this.auctions = [this.sampleAuction];
    this.auctions$.next(this.auctions);
  }

  createNewAuction(auction: any) {
    this.auctions.push(auction);
  }
  getAuctions() {
    return this.auctions$.asObservable();
  }
}
