import {Component, HostListener, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavigationEnd, Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  currentPage: any = null;
  showHeader: any = true;
  isAuthenticated: any = false;
  excludedPages: any = ['/login', '/change-password'];
  categories: any = [];

  constructor(private _location: Location, public apiService: ApiService, public router: Router, public sharedService: SharedService) {}

  ngOnInit() {
    // Subscribe to router events to track page changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update the currentPage based on the route
        this.currentPage = event.url;
        this.showHeader = !this.excludedPages.includes(this.currentPage);
      }
    });
    this.apiService.isAuthenticated.subscribe(res => this.isAuthenticated = res);
    this.getCategories();
  }

  getCategories() {
    this.apiService.getCategoriesData().subscribe(
      (res: any) => {
        this.categories = res;
        console.log(this.categories);
        this.sharedService.categories.next(res);
      }, (error => this.apiService.commonError(error)))
  }

  backClicked() {
    this._location.back();
  }

  logout() {
    this.apiService.logout().subscribe((res) => {
      this.apiService.showToast(res.message);
      this.router.navigate(['/login']);
    });
  }

  onChangePassword() {
    this.router.navigate(['/change-password']);
  }

  onLogin() {
    this.sharedService.showLogin.next(true);
    // this.router.navigate(['/login']);
  }

  onAdminPanel() {
    this.router.navigate(['/dashboard']);
  }

  showCart() {
    this.sharedService.showCart.next(true);
  }
}
