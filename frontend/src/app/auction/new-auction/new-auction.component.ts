import { Component } from '@angular/core';

import { AuctionService } from 'src/app/core/auction.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.scss'] // Add any necessary styles
})
export class NewAuctionComponent {
  showCarbonOffset = false;
  auction: any = {
    duration: null,
    fuelType: '',
    fuelAmount: null,
    carbonEmission: 0,
    carbonOffsetPercentage: 100
  };
  certificates = [
    {
      projectName: 'Forest Conservation in Amazon',
      offsetAmount: 1500,
      image: 'https://www.green.earth/hubfs/Deforestation%20in%20the%20Amazon%20Rainforest_amazon%20rainforest_featured.png'
    },
    {
      projectName: 'Wind Energy Production in Germany',
      offsetAmount: 1000,
      image: 'https://comsys.se/wp-content/uploads/2022/04/offshore-wind-farm.jpg'
    },
    {
      projectName: 'Forest Conservation in Amazon',
      offsetAmount: 100,
      image: 'https://www.green.earth/hubfs/Deforestation%20in%20the%20Amazon%20Rainforest_amazon%20rainforest_featured.png'
    }
  ];
  currentUser: any;
  constructor(private auctionService: AuctionService, private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
      this.auction.owner = this.currentUser;
    });
  }
  showCarbonOffsetPage() {
    this.showCarbonOffset = true;
  }
  showAuctionForm() {
    this.showCarbonOffset = false;
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
