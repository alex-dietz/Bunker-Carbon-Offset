import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctionComponent } from './auction/auction.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CertificatesComponent } from './certificates/certificates.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDG-YaETUA-w8MSz5BO1ryr506kAKvgZQc',
  authDomain: 'bunker-carbon-offset.firebaseapp.com',
  databaseURL: 'https://bunker-carbon-offset-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'bunker-carbon-offset',
  storageBucket: 'bunker-carbon-offset.appspot.com',
  messagingSenderId: '503462480645',
  appId: '1:503462480645:web:8a9c40c170c2591856056c'
};

@NgModule({
  declarations: [AppComponent, CertificatesComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, provideFirebaseApp(() => initializeApp(firebaseConfig)), provideFirestore(() => getFirestore())],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
