import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/dashboard/orders/orders.component';
import { AccountDetailsComponent } from './pages/dashboard/account-details/account-details.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AppHeaderComponent} from "./shared/app-header/app-header.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SlickCarouselModule} from "ngx-slick-carousel";
import { FancyCarousalComponent } from './shared/fancy-carousal/fancy-carousal.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { DynamicMatMenuComponent } from './shared/dynamic-mat-menu/dynamic-mat-menu.component';
import {NgxPaginationModule} from "ngx-pagination";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";
import { ProductDetailsComponent } from './pages/dashboard/product-details/product-details.component';
import { AddressDetailsComponent } from './pages/dashboard/address-details/address-details.component';
import { ShowOnViewDirective } from './shared/directives/show-on-view.directive';
import {HttpTokenInterceptorsService} from "./authentication/http-token-interceptors.service";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AboutUsComponent,
    ContactUsComponent,
    ShopListComponent,
    ShopDetailsComponent,
    ShopingCartComponent,
    DashboardComponent,
    OrdersComponent,
    AccountDetailsComponent,
    LoginRegisterComponent,
    AppHeaderComponent,
    FooterComponent,
    FancyCarousalComponent,
    OurServicesComponent,
    DynamicMatMenuComponent,
    ProductDetailsComponent,
    AddressDetailsComponent,
    ShowOnViewDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    HttpClientModule,
    SlickCarouselModule,
    MatSidenavModule,
    NgxPaginationModule,
    CKEditorModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptorsService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
