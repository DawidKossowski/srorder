import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserAdressService {

  constructor(private http: Http) { }

  private geocoder = new google.maps.Geocoder();
  private defaultAdressUrl = '/api/getDefaultAdress';

  getPlaceIdByUserId(id: number) {
    return this.http.get(this.defaultAdressUrl, { params: { userId: id } })
      .toPromise()
      .then(response => response.text());
  }

  getUserAdress(id: number) {
    return new Promise(resolve => {
      this.getPlaceIdByUserId(id).then(response => {
        this.geocoder.geocode({'placeId': response }, function(results, status) {
           resolve(results);
        });
      });
    });
  }

}
