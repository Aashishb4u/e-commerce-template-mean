import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  p: any = 1;
  productPage: any = 1;
  title = 'angular';
  showLogOut: any = false;
  viewMode: any = 'orders';
  products: any = [
    {
      name: "Chain Clean Degeaser 1",
      img: "assets/products/product_1.png",
      cat: "Grease",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Radiator Flush & Clean 2",
      img: "assets/products/product_2.png",
      cat: "Additives",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Hydro Finish Restorer Polish 3",
      img: "assets/products/product_3.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Valve & Injector Cleaner 4",
      img: "assets/products/product_4.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    },
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
    }
  ];
  ckEditorLoaded = false;
  Editor: any;
  isBrowser = false;
  ckEditorData: any;
  categories: any = [];
  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document,
    @Inject(PLATFORM_ID) private platformId,
    public sharedService: SharedService,
    private cdr: ChangeDetectorRef) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  ngOnInit() {

  }


  onLogout() {
    this.sharedService.showLogout.next(true);
  }
}
