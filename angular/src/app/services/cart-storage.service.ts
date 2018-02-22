import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Product } from '../product-list/product';
import {User} from "../User/User";
import {Http} from "@angular/http";

@Injectable()
export class CartStorageService {

  constructor(private http: Http) { }

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


  saveCartInDB(cartContent: Product[] ) {
    const _idToSend: Array<Number> = [];
    const _amountsToSend: Array<Number> = [];
    cartContent.forEach( x => {
      _idToSend.push(x.id);
      _amountsToSend.push(x.amount);
    });

    const parameters = {
      'productsIds': _idToSend,
      'amounts': _amountsToSend,
      'userId': (JSON.parse(localStorage.getItem('currentUser')) as User).id
    };
    this.http.post('/api/saveCartAtOnce', parameters) .toPromise()
      .then()
      .catch();
  }


  deliverCart() {
    return this.http.get('/api/getUserCart', {params: {userId: (JSON.parse(localStorage.getItem('currentUser')) as User).id}})
      .toPromise().then().catch();
  }


  getCart(): any {
     return new Promise( resolve => {
       this.deliverCart().then(response => {
           resolve(response.json() as Product[]);
         });
     });
  }


  post(parameters) {
    return this.http.post('/api/mergeCart', parameters). toPromise()
      .then().catch();
  }

  mergeCart(parameters) {
    return new Promise( resolve => {
      this.post(parameters).then( response => {
        resolve(response);
      });

    });
  }

  mergeAndGetCart(cartContent: Product[]) {
    const _idToSend: Array<Number> = [];
    const _amountsToSend: Array<Number> = [];
    cartContent.forEach( x => {
      _idToSend.push(x.id);
      _amountsToSend.push(x.amount);
    });

    const parameters = {
      'productsIds': _idToSend,
      'amounts': _amountsToSend,
      'userId': (JSON.parse(localStorage.getItem('currentUser')) as User).id
    };

    return new Promise(resolve => {
      this.mergeCart(parameters)
        .then( this.getCart().then(response =>
          resolve(response)));
    }).catch();
  }

}
