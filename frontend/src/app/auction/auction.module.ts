import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionComponent } from './auction.component';
//add routing
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: AuctionComponent }];
@NgModule({
  declarations: [AuctionComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AuctionModule {}
