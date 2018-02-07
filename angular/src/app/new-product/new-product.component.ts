import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NewProductService} from './service/new-product.service';
import {Http, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public name: string;
  public price: number;
  public amount: number;
  constructor(private NewProductService: NewProductService, private http: Http) { }

  ngOnInit() {
  }

  submitProduct(form: NgForm) {
    this.NewProductService.addProduct(this.name, this.price, this.amount);
    form.reset();
  }
  test() {
    this.http.post('/api/kurwa', this.name).toPromise().then().catch();
  }
}
