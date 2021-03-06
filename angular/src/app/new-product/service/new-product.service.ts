import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class NewProductService {

  constructor(private http: Http) {

  }

  private productsUrl = '/api/addProduct';

  addProduct( name: string, price: number, amount: number): Promise<string> {
    return this.http.get(this.productsUrl, { params: { name: name, price: price, amount: amount } }  )
      .toPromise()
      .then(response => {
        if (response.status === 200) {
          alert(response.text());
        } else {
          alert('Error');
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
