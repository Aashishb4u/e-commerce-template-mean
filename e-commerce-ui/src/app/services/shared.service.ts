import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {appConstants} from "../../assets/constants/app-constants";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  noImageIcon: any = 'assets/no-image.jpeg';
  ownerContact = '8788707579';
  sizeOfOriginalImage: any = '';
  submitFeedbackSuccess = new BehaviorSubject(false);
  submitEnquirySuccess = new BehaviorSubject(false);
  showBackIcon = new BehaviorSubject(false);
  dashboardMenu$ = new BehaviorSubject('dashboard');
  showSpinner = new BehaviorSubject(false);
  showBrandSpinner = new BehaviorSubject(false);
  companyLogo: any = appConstants.creativeHandLogo;
  companyLogoName: any = appConstants.creativeHandLogoName;
  companyLogoTransperant: any = appConstants.creativeHandLogoTransperant;
  companyLogoAnimation: any = appConstants.creativeHandLogoAnimation;
  businessLogoName: any = '';
  businessLogoImageLink: any = '';
  showCart = new BehaviorSubject(false);
  showLogin = new BehaviorSubject(false);
  showLogout = new BehaviorSubject(false);
  doLogout = new BehaviorSubject(false);
  categories = new BehaviorSubject([]);
  constructor() { }
}
