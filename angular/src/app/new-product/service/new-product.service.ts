import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Product } from '../../product-list/product';
import { ADDRGETNETWORKPARAMS } from 'dns';


@Injectable()

export class NewProductService {

  constructor(private http: Http) {

  }

  private productsUrl = '/api/addProduct';

  addProduct(product: Product): Promise<Product[]> {
      
    return this.http.post(this.productsUrl, {name: product.name, price: product.price  }  )
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
