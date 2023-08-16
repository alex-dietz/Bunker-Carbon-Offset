import { Component } from '@angular/core';

import { AuctionService } from 'src/app/core/auction.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.scss'] // Add any necessary styles
})
export class NewAuctionComponent {
  auction: any = {
    duration: null,
    fuelType: '',
    fuelAmount: null,
    carbonEmission: 0,
    carbonOffsetPercentage: 100
  };
  currentUser: any;
  constructor(private auctionService: AuctionService, private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
      this.auction.owner = this.currentUser;
    });
  }
  getRangeColor(): string {
    if (this.auction?.carbonOffsetPercentage <= 10) {
      return 'red';
    }
    // You can add more conditions for other colors and percentage ranges
    return 'black'; // Default color
  }

  updateCarbonOffset() {
    this.auction.carbonOffset = (this.auction.carbonEmission * this.auction.carbonOffsetPercentage) / 100;
  }
  updateCarbonEmission() {
    let calculatedUsage = 0;

    if (this.auction.fuelType === 'petrol') {
      calculatedUsage = this.auction.fuelAmount * 1;
    } else if (this.auction.fuelType === 'diesel') {
      calculatedUsage = this.auction.fuelAmount * 8;
    } else if (this.auction.fuelType === 'electric') {
      calculatedUsage = this.auction.fuelAmount * 0.2;
    }
    this.auction.carbonEmission = calculatedUsage;
    this.updateCarbonOffset();
  }

  submitForm() {
    // You can handle form submission logic here
    this.auctionService.createNewAuction(this.auction);
    // Reset the form after submission
    this.auction = {
      duration: null,
      fuelType: ''
    };
  }
}
