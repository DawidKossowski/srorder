import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms'; 
 import {NewProductService} from './service/new-product.service';
 import {Product} from '../product-list/product'
 
@Component({ 
  selector: 'app-new-product', 
  templateUrl: './new-product.component.html', 
  styleUrls: ['./new-product.component.css'] 
}) 
export class NewProductComponent implements OnInit { 
 
  constructor(private NewProductService: NewProductService) { } 
 
  ngOnInit() { 
  } 
 
  submitProduct(form: NgForm) { 
    console.log(form.value); 

 
  } 
}