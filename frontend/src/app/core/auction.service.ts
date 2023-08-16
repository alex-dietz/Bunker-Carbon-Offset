import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  auctions: any = [];
  auctionCollection: any;
  auctions$: any;
  constructor(private firestore: Firestore) {
    const auctionCollection = collection(this.firestore, 'auctions');
    this.auctions$ = new BehaviorSubject<any>(null);
    this.auctions$.next(this.auctions);
  }

  createNewAuction(auction: any) {
    return addDoc(this.auctionCollection, auction);
  }
  getAuctions() {
    return collectionData(this.auctionCollection, {
      idField: 'id'
    }) as Observable<any[]>;
  }
}
