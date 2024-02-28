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

  testimonialConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "autoplay": true,
    "infinite": true,
    "pauseOnHover": false
  }

  mainSlickConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    fade:true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 300,
    lazyLoad: 'ondemand',
    asNavFor: '.thumb-nav',
    prevArrow: '<div class="slick-prev"><i class="i-prev"></i><span class="sr-only sr-only-focusable">Previous</span></div>',
    nextArrow: '<div class="slick-next"><i class="i-next"></i><span class="sr-only sr-only-focusable">Next</span></div>'
  }

  bottomSlick = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    centerPadding: '0px',
    asNavFor: '.main-img-slider',
    dots: false,
    centerMode: true,
    draggable: true,
    speed: 200,
    focusOnSelect: true,
    prevArrow: '<div class="slick-prev"><i class="i-prev"></i><span class="sr-only sr-only-focusable">Previous</span></div>',
    nextArrow: '<div class="slick-next"><i class="i-next"></i><span class="sr-only sr-only-focusable">Next</span></div>'
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


  dummyImages = [
    {
      img: 'http://via.placeholder.com/72x50'
    },
    {
      img: 'http://via.placeholder.com/72x50'
    },
    {
      img: 'http://via.placeholder.com/72x50'
    },
    {
      img: 'http://via.placeholder.com/72x50'
    },
    {
      img: 'http://via.placeholder.com/72x50'
    },
    {
      img: 'http://via.placeholder.com/72x50'
    },
    {
      img: 'http://via.placeholder.com/72x50'
    },
    {
      img: 'http://via.placeholder.com/72x50'
    }
  ]

  images: any = [
    {
     img: 'http://via.placeholder.com/1920x1280'
    },
    {
      img: 'http://via.placeholder.com/1920x1280'
    },
    {
      img: 'http://via.placeholder.com/1920x1280'
    },
    {
      img: 'http://via.placeholder.com/1920x1280'
    },
    {
      img: 'http://via.placeholder.com/1920x1280'
    },
    {
      img: 'http://via.placeholder.com/1920x1280'
    }
  ]

  toggleCart() {
    this.sharedService.showCart.next(true);
  }
}
