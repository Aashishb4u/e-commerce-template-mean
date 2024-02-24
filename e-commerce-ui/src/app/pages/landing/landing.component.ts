import { Component } from '@angular/core';
import 'animate.css';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
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
  slides = [
    {
      img: "assets/banners/slick-1.png",
      // subTitle: "Automotive Oils",
      title: "Automotive Oils",
    },
    {
      img: "assets/banners/slick-2.png",
      // subTitle: "Lubricants",
      title: "Lubricants",
    },
    {
      img: "assets/banners/slick-3.png",
      // subTitle: "Brake Fluids",
      title: "Brake Fluids",
    }
  ];
  testimonials: any = [
    {},
    {},
    {},
    {},
    {},
    {}
  ]
  slideConfig = {"slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "pauseOnHover": false,
    "fade": true
  };

  testimonialConfig = {
    "slidesToShow": 3,
    "centerMode": true,
    "slidesToScroll": 1,
    "autoplay": true,
    "pauseOnHover": false
  }

  toggleCart() {
    this.sharedService.showCart.next(true);
  }
}
