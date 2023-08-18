import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
  certificates = [
    {
      projectName: 'Forest Conservation in Amazon',
      offsetAmount: 10,
      transactionHash: '345',
      owner: {
        username: 'Buyer Inc.'
      },
      image: 'https://www.green.earth/hubfs/Deforestation%20in%20the%20Amazon%20Rainforest_amazon%20rainforest_featured.png'
    },
    {
      projectName: 'Wind Energy Production in Germany',
      offsetAmount: 1500,
      transactionHash: '345',
      owner: {
        username: 'Bunker Holding'
      },
      image: 'https://comsys.se/wp-content/uploads/2022/04/offshore-wind-farm.jpg'
    },
    {
      projectName: 'Forest Conservation in Amazon',
      offsetAmount: 100,
      transactionHash: '345',
      owner: {
        username: 'Nordic Energy'
      },
      image: 'https://www.green.earth/hubfs/Deforestation%20in%20the%20Amazon%20Rainforest_amazon%20rainforest_featured.png'
    }
    // ... Add more certificates as required
  ];
}
