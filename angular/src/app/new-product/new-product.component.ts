import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NewProductService} from './service/new-product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public name: string;
  public price: number;
  public amount: number;
  constructor(private NewProductService: NewProductService) { }

  ngOnInit() {
  }

  submitProduct(form: NgForm) {
    this.NewProductService.addProduct(this.name, this.price, this.amount).catch();
    form.reset();
  }

}
