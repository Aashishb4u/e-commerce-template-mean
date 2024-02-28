import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss'
})
export class ShopListComponent implements OnInit {
  constructor(public Activatedroute: ActivatedRoute, public sharedService: SharedService, public apiService: ApiService) {
  }
  categoriesData: any = [];
  menus: any = [];
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
  title: any = "SHOP LIST";
  imageBanner: any = "assets/banners/oil-banner-3.png";
  ngOnInit() {
    this.sharedService.categories.subscribe((res: any) => {
      this.categoriesData = res;
      this.menus = this.categoriesData
      this.Activatedroute.queryParams
        .subscribe(params => {
          console.log(params);
          console.log(this.categoriesData);
          const category = params['category'];
          const categoryData = this.categoriesData.find(v => v.name.split(' ').join('_').toLowerCase() === category.toLowerCase());
          this.menus = categoryData.children;
          this.title = categoryData.name;
          this.imageBanner = categoryData.img;
        });
    });
    // this.router.queryParams.subscribe(res=>{
    //   console.log(res) //will give query params as an object
    // });

  }

  toggleCart() {
    this.sharedService.showCart.next(true);
  }
}
