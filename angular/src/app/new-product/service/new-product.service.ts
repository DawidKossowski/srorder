import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Product } from '../../product-list/product';



@Injectable()

export class NewProductService {

  constructor(private http: Http) {

  }

  private productsUrl = '/api/addProduct';

  addProduct( name: string, price: number): Promise<string> {
    return this.http.get(this.productsUrl, { params: { name: name, price: price } }  )
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
