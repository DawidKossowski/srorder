import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Product } from '../product';


@Injectable()

export class ProductService {

  constructor(private http: Http) {

  }

  private productsUrl = '/api/allProducts';
  private orderUrl = '/api/createOrder';

  getProducts(): Promise<Product[]> {
    return this.http.get(this.productsUrl)
      .toPromise()
      .then(response => response.json() as Product[])
      .catch(this.handleError);
  }

  createOrder(productsId: Array<Number>): Promise<string> {
    return this.http.get(this.orderUrl, productsId)
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
