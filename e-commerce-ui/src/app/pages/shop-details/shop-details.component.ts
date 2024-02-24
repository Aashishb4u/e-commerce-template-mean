import { Component } from '@angular/core';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.scss'
})
export class ShopDetailsComponent {
  constructor(public sharedService: SharedService) {
  }
  products: any = [
    {
      name: "Chain Clean Degeaser",
      img: "assets/products/product_1.png",
      cat: "Grease",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Radiator Flush & Clean",
      img: "assets/products/product_2.png",
      cat: "Additives",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Hydro Finish Restorer Polish",
      img: "assets/products/product_3.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Valve & Injector Cleaner",
      img: "assets/products/product_4.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    }, {
      name: "Chain Clean Degeaser",
      img: "assets/products/product_1.png",
      cat: "Grease",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Radiator Flush & Clean",
      img: "assets/products/product_2.png",
      cat: "Additives",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Hydro Finish Restorer Polish",
      img: "assets/products/product_3.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Valve & Injector Cleaner",
      img: "assets/products/product_4.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    }
  ];

  testimonialConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "autoplay": true,
    "infinite": true,
    "pauseOnHover": false
  }

  toggleCart() {
    this.sharedService.showCart.next(true);
  }
}
