import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctionComponent } from './auction/auction.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CertificatesComponent } from './certificates/certificates.component';

@NgModule({
  declarations: [AppComponent, CertificatesComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
