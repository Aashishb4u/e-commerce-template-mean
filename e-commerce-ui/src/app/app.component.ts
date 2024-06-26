import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {SharedService} from "./services/shared.service";
import {MatSidenav} from "@angular/material/sidenav";
import {NavigationEnd, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('drawer', {static: true}) sidenav: MatSidenav;
  @ViewChild('loginDrawer', {static: true}) loginSideNav: MatSidenav;
  title = 'e-commerce-ui';
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
  isBrowser: any = false;
  constructor(@Inject(PLATFORM_ID) private platformId,
              public apiService: ApiService,
              public sharedService: SharedService,
              private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if(this.isBrowser) {
      this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      });
    }

    this.sharedService.showCart.subscribe((val) => {
      if(val) {
        this.sidenav.toggle();
      }
    });
    this.sharedService.showLogin.subscribe((val) => {
      if(val) {
        this.loginSideNav.toggle();
      }
    });

    this.sharedService.doLogout.subscribe((res) => {
      if(res) {
        const refreshToken = localStorage.getItem('my-refresh-token');
        this.logout(refreshToken);
      }
    });
  }

  onViewCart() {
    this.router.navigate(['/cart'], { state: { route: 'shoppingBag' } });
    this.sidenav.close();
  }

  onCheckout() {
    this.router.navigate(['/cart'], { state: { route: 'checkout' } });
    this.sidenav.close();
  }

  togglePopup() {
    const toggleStatus = this.sharedService.showLogout.value;
   this.sharedService.showLogout.next(!toggleStatus);
  }

  confirm() {
    this.sharedService.doLogout.next(true);
    this.router.navigate(['/login']);
    this.sharedService.showLogout.next(false);
  }

  logout(refreshToken) {
    this.apiService.logout(refreshToken).subscribe((res) => {
      if(res) {
        this.apiService.showToast(res.message);
      }
      this.router.navigate(['']);
    });
  }
}
