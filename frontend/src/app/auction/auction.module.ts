import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionComponent } from './auction.component';
//add routing
import { RouterModule, Routes } from '@angular/router';
import { NewAuctionComponent } from './new-auction/new-auction.component';
import { FormsModule } from '@angular/forms';
import { BidModalComponent } from './bid-modal/bid-modal.component';
const routes: Routes = [
  { path: '', component: AuctionComponent },
  { path: 'new', component: NewAuctionComponent }
];
@NgModule({
  declarations: [AuctionComponent, NewAuctionComponent, BidModalComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class AuctionModule {}
