import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, forkJoin, from} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {appConstants} from "../../assets/constants/app-constants";
import {tap} from "rxjs";
import {of, switchMap} from "rxjs";
import {SharedService} from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = appConstants.baseURLAdminAPIs;
  baseAuthUrl: string = appConstants.baseAuthUrl;
  domainUrlApi: string = appConstants.domainUrlApi;
  currentAccessToken: any = null;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onLoadToken = new BehaviorSubject<any>('');
  dataStream = new BehaviorSubject<any>({
    destinations: [],
    camping: [],
    accommodations: []
  });
  constructor(public sharedService: SharedService, private router: Router, private http: HttpClient, public storageService: StorageService, public snackBar: MatSnackBar) {
    this.loadToken();
  }

  getCategoriesData() {
    return this.http.get(`assets/json/categories.json`);
  }

  getDataStream(): Promise<any> {
    return new Promise((resolve, reject) => {
      const destinations$ = this.getAllDestinationsForWebsite();
      const camping$ = this.getAllCampingForWebsite();
      const accommodations$ = this.getAllAccommodationsForWebsite();

      forkJoin([destinations$, camping$, accommodations$]).subscribe(
        (res: any) => {
          const destinations = res[0].data;
          const campings = res[1].data;
          const accommodations = res[2].data;

          const result = {
            destinations: destinations,
            camping: campings,
            accommodations: accommodations,
          };

          this.dataStream.next(result);
          resolve(result); // Resolve the promise with the result
        },
        error => {
          this.commonError(error);
          reject(error); // Reject the promise with the error
        }
      );
    });
  }


  loadToken() {
    const token = this.storageService.getStorageValue(appConstants.ACCESS_TOKEN_KEY);
    if (token) {
      this.currentAccessToken = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  getNewAccessToken() {
    const refreshToken = from(this.storageService.getStoredValue(appConstants.REFRESH_TOKEN_KEY));
    return refreshToken.pipe(
      switchMap(token => {
        if (token) {
          const resBody = {
            refreshToken: token
          };
          return this.http.get(`${this.baseAuthUrl}refresh-tokens`);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  // Store a new access token
  storeAccessToken(accessToken: any) {
    this.currentAccessToken = accessToken;
    return from(this.storageService.storeValue(appConstants.ACCESS_TOKEN_KEY, accessToken));
  }

  get userDetails() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData;
  }

  get userRole() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData && userData.role ? userData.role.name : '';
  }

  get userId() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData && userData.id ? userData.id : '';
  }

  get userName() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData && userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : '';
  }

  get userEmail() {
    const userData = this.storageService.getEncryptedStorageValue(appConstants.USER_INFO);
    return userData && userData.email ? userData.email : '';
  }

  register(data: any) {
    return this.http.post(`${this.baseAuthUrl}register`, data, {}).pipe(
      tap((response: any) => {
        if (response.tokens && response.user) {
          this.storageService.storeEncryptedValue(appConstants.USER_INFO, response!.user);
          this.storageService.storeValue(appConstants.ACCESS_TOKEN_KEY, response.tokens.access.token);
          this.storageService.storeValue(appConstants.REFRESH_TOKEN_KEY, response.tokens.refresh.token);
          this.loadToken();
          this.isAuthenticated.next(true);
        }
      })
    );
  }

  login(data: any) {
    return this.http.post(`${this.baseAuthUrl}login`, data, {}).pipe(
      tap((response: any) => {
        if (response.tokens && response.user) {
          this.storageService.storeEncryptedValue(appConstants.USER_INFO, response!.user);
          this.storageService.storeValue(appConstants.ACCESS_TOKEN_KEY, response.tokens.access.token);
          this.storageService.storeValue(appConstants.REFRESH_TOKEN_KEY, response.tokens.refresh.token);
          this.loadToken();
          this.isAuthenticated.next(true);
        }
      })
    );
  }

  logout(refreshToken) {
    return this.http.post(`${this.baseAuthUrl}logout`, {refreshToken: refreshToken}, {}).pipe(
      tap((response: any) => {
        this.isAuthenticated.next(false);
        this.storageService.removeStoredItem(appConstants.REFRESH_TOKEN_KEY);
        this.storageService.removeStoredItem(appConstants.ACCESS_TOKEN_KEY);
        this.storageService.removeStoredItem(appConstants.USER_INFO);
      })
    );
  }

  changePassword(data) {
    return this.http.post(`${this.baseAuthUrl}reset-password`, data, {});
  }

  // Users Apis -

  getRoles() {
    return this.http.get(`${this.baseURL}roles`, {});
  }

  getUsers(params) {
    return this.http.get(`${this.baseURL}users`, {params});
  }

  getEnquiries(params) {
    return this.http.get(`${this.baseURL}enquiries`, {params});
  }

  getUserById(data) {
    return this.http.post(`${this.baseURL}users/all`, data, {});
  }

  addUser(data) {
    return this.http.post(`${this.baseURL}users`, data, {});
  }

  updateUserById(data, id) {
    return this.http.put(`${this.baseURL}users/${id}`, data, {});
  }

  deleteUser(id) {
    return this.http.delete(`${this.baseURL}users/${id}`, {});
  }

  addDestination(data) {
    return this.http.post(`${this.baseURL}destinations`, data, {});
  }

  updateDestinationById(data, id) {
    return this.http.post(`${this.baseURL}destinations/edit/${id}`, data, {});
  }

  getDestinationById(data) {
    return this.http.post(`${this.baseURL}destinations/all`, data, {});
  }

  getDestinations(params = {}) {
    return this.http.get(`${this.baseURL}destinations`, {params});
  }

  getAllDestinations(params = {}) {
    return this.http.post(`${this.baseURL}destinations/all`, {params});
  }

  deleteDestination(id) {
    return this.http.delete(`${this.baseURL}destinations/${id}`, {});
  }

  addCamping(data) {
    return this.http.post(`${this.baseURL}campings`, data, {});
  }

  updateCampingById(data, id) {
    return this.http.post(`${this.baseURL}campings/edit/${id}`, data, {});
  }

  getCampingById(data) {
    return this.http.post(`${this.baseURL}campings/all`, data, {});
  }

  getAssets(params = {}) {
    return this.http.get(`${this.baseURL}assets`, {params});
  }

  getAllAssets(params = {}) {
    return this.http.post(`${this.domainUrlApi}all/assets`, {params});
  }

  addAsset(data) {
    return this.http.post(`${this.baseURL}assets`, data, {});
  }

  deleteAsset(id) {
    return this.http.delete(`${this.baseURL}assets/${id}`, {});
  }

  getAssetById(data) {
    return this.http.post(`${this.baseURL}assets/all`, data, {});
  }

  updateAssetById(data, id) {
    return this.http.post(`${this.baseURL}assets/edit/${id}`, data, {});
  }

  getCampings(params) {
    return this.http.get(`${this.baseURL}campings`, {params});
  }

  deleteCamping(id) {
    return this.http.delete(`${this.baseURL}campings/${id}`, {});
  }

  addAccommodation(data) {
    return this.http.post(`${this.baseURL}accommodations`, data, {});
  }

  getAccommodationById(data) {
    return this.http.post(`${this.baseURL}accommodations/all`, data, {});
  }

  getAllAccommodation() {
    return this.http.post(`${this.baseURL}accommodations/all`, {}, {});
  }

  getAccommodations(params) {
    return this.http.get(`${this.baseURL}accommodations`, {params});
  }

  deleteAccommodation(id) {
    return this.http.delete(`${this.baseURL}accommodations/${id}`, {});
  }

  updateAccommodationById(data, id) {
    return this.http.post(`${this.baseURL}accommodations/edit/${id}`, data, {});
  }

  addCustomPricing(data) {
    return this.http.post(`${this.baseURL}custom-pricing`, data, {});
  }

  getCustomPricingById(data) {
    return this.http.post(`${this.baseURL}custom-pricing/all`, data, {});
  }

  getCustomPricings(params) {
    return this.http.get(`${this.baseURL}custom-pricing`, {params});
  }

  deleteCustomPricing(id) {
    return this.http.delete(`${this.baseURL}custom-pricing/${id}`, {});
  }

  updateCustomPricingById(data, id) {
    return this.http.put(`${this.baseURL}custom-pricing/${id}`, data, {});
  }

  addCustomBooking(data) {
    return this.http.post(`${this.baseURL}custom-booking`, data, {});
  }

  makeBooking(data) {
    return this.http.post(`${this.domainUrlApi}make/online-booking`, data, {});
  }

  makeReview(data) {
    return this.http.post(`${this.domainUrlApi}make/review`, data, {});
  }

  makeEnquiry(data) {
    return this.http.post(`${this.domainUrlApi}make/enquiry`, data, {});
  }

  getCustomBookingById(data) {
    return this.http.post(`${this.baseURL}custom-booking/all`, data, {});
  }

  getCustomBookings(params) {
    return this.http.get(`${this.baseURL}custom-booking`, {params});
  }

  deleteCustomBooking(id) {
    return this.http.delete(`${this.baseURL}custom-booking/${id}`, {});
  }

  updateCustomBookingById(data, id) {
    return this.http.put(`${this.baseURL}custom-booking/${id}`, data, {});
  }


  getAllAmenities(params = {}) {
    return this.http.post(`${this.domainUrlApi}all/amenities`, {params});
    // return this.http.get(`assets/constants/amenities.json`);
  }

  getAllDestinationsForWebsite(params = {}) {
    return this.http.post(`${this.domainUrlApi}all/destinations`, {params});
  }

  getAllAccommodationsForWebsite(params = {}) {
    return this.http.post(`${this.domainUrlApi}all/accommodations`, {params});
  }

  getAllAmenitiesForWebsite(params = {}) {
    return this.http.post(`${this.domainUrlApi}all/amenities`, {params});
  }

  getAllCampingForWebsite(params = {}) {
    return this.http.post(`${this.domainUrlApi}all/camping`, {params});
  }

  getAllCustomPricingForWebsite(params = {}) {
    return this.http.post(`${this.domainUrlApi}all/custom-pricing`, {params});
  }

  commonError(err: any) {
    const refreshToken = this.storageService.getStoredValue(appConstants.REFRESH_TOKEN_KEY);
    const errCode = err.status;
    this.sharedService.showSpinner.next(false);
    if (err && err.error && err.error.message) {
      this.showToast(err.error.message);
    } else if (err && err.message) {
      this.showToast(err.message);
    }

    switch (errCode) {
      case 401: {
        this.logout(refreshToken).subscribe((res) => {
          this.showToast('Logged out due to authentication mismatch');
          this.router.navigate(['']);
        });
        break;
      }

      case 400: {
        this.showToast('Bad Request');
        break;
      }

      case 403: {
        console.log('here');
        // this.logout().subscribe((res) => {
        //     this.showToast('Logged out due to authentication mismatch');
        //     this.router.navigate(['/login']);
        // });
        break;
      }

      case 0: {
        let errorMessage = err.error.message;
        errorMessage = 'No Internet Connection';
        break;
      }
    }
  }

  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

}
