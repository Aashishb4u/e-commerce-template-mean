import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginRegisterComponent} from "./pages/login-register/login-register.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {ContactUsComponent} from "./pages/contact-us/contact-us.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {ShopDetailsComponent} from "./pages/shop-details/shop-details.component";
import {ShopListComponent} from "./pages/shop-list/shop-list.component";
import {ShopingCartComponent} from "./pages/shoping-cart/shoping-cart.component";
import {AccountDetailsComponent} from "./pages/dashboard/account-details/account-details.component";
import {OrdersComponent} from "./pages/dashboard/orders/orders.component";
import {OurServicesComponent} from "./pages/our-services/our-services.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:  'login', component:  LoginRegisterComponent},
  { path:  'about-us', component:  AboutUsComponent},
  { path:  'contact-us', component:  ContactUsComponent},
  { path:  'home', component:  LandingComponent},
  { path:  'shop-details', component:  ShopDetailsComponent},
  { path:  'shop-list', component:  ShopListComponent},
  { path:  'cart', component:  ShopingCartComponent},
  { path:  'services', component:  OurServicesComponent},
  { path:  'cart', component:  ShopingCartComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path:  'account-details', component:  AccountDetailsComponent},
      { path:  'orders', component:  OrdersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
