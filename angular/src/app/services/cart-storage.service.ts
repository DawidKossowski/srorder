import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Product } from '../product-list/product';

@Injectable()
export class CartStorageService {
  private storageSub = new Subject<boolean>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next();
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storageSub.next();
  }
}
