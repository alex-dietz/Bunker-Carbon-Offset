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
    date: null,
    fuelType: '',
    fuelAmount: null,
    carbonEmission: 0,
    carbonOffsetPercentage: 100
  };
  certificates = [
    {
      projectName: 'Forest Conservation in Amazon',
      offsetAmount: 500,
      image: 'https://www.green.earth/hubfs/Deforestation%20in%20the%20Amazon%20Rainforest_amazon%20rainforest_featured.png'
    },
    {
      projectName: 'Wind Energy Production in Germany',
      offsetAmount: 3000,
      image: 'https://comsys.se/wp-content/uploads/2022/04/offshore-wind-farm.jpg'
    },
    {
      projectName: 'Mongolia Improved Forest Management',
      offsetAmount: 100,
      image: 'https://bluepeak.net/wp-content/uploads/2019/10/Forest-in-Terelj-Tuv-Aimag-Mongolia-MN51-26.jpg',
      link: 'https://www.carbonmark.com/projects/VCS-1529-2011'
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

    if (this.auction.fuelType === 'gas_oil') {
      calculatedUsage = this.auction.fuelAmount * 3;
    } else if (this.auction.fuelType === 'MGO') {
      calculatedUsage = this.auction.fuelAmount * 2.8;
    } else if (this.auction.fuelType === 'RMG_380') {
      calculatedUsage = this.auction.fuelAmount * 3.2;
    }
    this.auction.carbonEmission = calculatedUsage;
    this.updateCarbonOffset();
  }

  submitForm() {
    this.auction.status = 'scheduled';
    this.auction.bids = [];

    // You can handle form submission logic here
    this.auctionService.createNewAuction(this.auction);
  }
}
