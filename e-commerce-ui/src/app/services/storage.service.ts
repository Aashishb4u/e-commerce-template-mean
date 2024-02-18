import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  isBrowser: any;
  constructor(@Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async storeValue(storageKey: string, value: any) {
    if(this.isBrowser) {
      localStorage.setItem(storageKey, value);
    }
    // const encryptedValue = btoa(escape(JSON.stringify(value)));
  }

  async getStoredValue(storageKey: string) {
    return new Promise(resolve => {
      const value = localStorage.getItem(storageKey);
      if (value) {
        resolve(value);
      } else {
        resolve(false);
      }
    });
  }

  async removeStoredItem(storageKey: string) {
    localStorage.removeItem(storageKey);
  }

  getStorageValue(storageKey: any) {
    let storedVal = null;
    if(this.isBrowser) {
      storedVal = localStorage.getItem(storageKey);
    }
    return storedVal ? (storedVal) : null;
  }

  async storeEncryptedValue(storageKey: string, value: any) {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    localStorage.setItem(storageKey, encryptedValue);
  }

  getEncryptedStorageValue(storageKey: any) {
    const storedVal = localStorage.getItem(storageKey);
    return storedVal ? (JSON.parse(unescape(atob(storedVal)))) : null;
  }

}
