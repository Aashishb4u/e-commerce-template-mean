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
  params: any;
  title: any = "SHOP LIST";
  imageBanner: any = "assets/banners/oil-banner-3.png";

  ngOnInit() {
    this.Activatedroute.queryParams.subscribe(params => {
      this.params = params;
      this.fetchData();
    });
  }

  fetchData() {
    this.sharedService.categories.subscribe((res: any) => {
      this.categoriesData = res;
      this.menus = this.categoriesData.children;
      this.title = this.categoriesData.name;
      this.imageBanner = this.categoriesData.img;
      if (this.params && this.params['category'] && this.categoriesData.children && this.categoriesData.children.length) {
        const category = this.params['category'];
        const categoryData = this.categoriesData.children.find(v => v.name.split(' ').join('_').toLowerCase() === category.toLowerCase());
        this.menus = categoryData.children;
        this.title = categoryData.name;
        this.imageBanner = categoryData.img;
      }
    });
  }

  toggleCart() {
    this.sharedService.showCart.next(true);
  }
}
