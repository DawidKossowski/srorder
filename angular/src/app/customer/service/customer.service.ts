import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()

export class customerService {

  constructor(private http: Http) {

  }

  private createUrl = '/api/createCustomer';

  createCustomer(name: string, surname: string, adress: string): Promise<string> {
    return this.http.get(this.createUrl,
      {params: { name: name, surname: surname, adress: adress } } )
      .toPromise().then().catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
