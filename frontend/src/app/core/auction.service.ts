import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  auctions: any = [];
  auctions$: any;
  constructor() {
    this.auctions$ = new BehaviorSubject<any>(null);
    this.auctions$.next(this.auctions);
  }

  createNewAuction(auction: any) {
    this.auctions.push(auction);
  }
  getAuctions() {
    return this.auctions$.asObservable();
  }
}
