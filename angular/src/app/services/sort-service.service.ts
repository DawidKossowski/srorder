import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Product} from "../product-list/product";

@Injectable()
export class SortServiceService {

  constructor(private http: Http) { }

  private alphSort = '/api/sortAlphabetically';
  private PriceSort = 'api/sortByPrice';



  sortAlphabetically()  {
     return this.http.get(this.alphSort)
      .toPromise()
      .then(response => response.json() as Product[]).catch();

  }


  sortByPrice()  {
    return this.http.get(this.PriceSort)
      .toPromise()
      .then(response => response.json() as Product[]).catch();

  }
}
