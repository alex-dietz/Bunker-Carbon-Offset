import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component';

const routes: Routes = [
  //auction routes
  { path: '', redirectTo: 'auctions', pathMatch: 'full' },
  { path: 'auctions', loadChildren: () => import('./auction/auction.module').then((m) => m.AuctionModule) }
  { path: 'certificates', component: CertificatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
