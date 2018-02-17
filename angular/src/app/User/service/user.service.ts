import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()

export class UserService {

  constructor(private http: Http) {

  }

  private registerUrl = '/api/registration';
  private loginUrl = '/api/login';

  registerUser( sex: string, name: string, surname: string,
                email: string, password: string, adress: string): Promise<string> {
    return this.http.get(this.registerUrl, {params: {sex, name, surname, email, password, adress }})
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

  login( email: string, password: string) : Promise<string> {
    return this.http.get(this.loginUrl, {params: {email, password}}).toPromise()
      .then(response => {
        console.log(response);
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
