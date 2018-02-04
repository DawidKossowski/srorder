import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms'; 
 
 
@Component({ 
  selector: 'app-new-product', 
  templateUrl: './new-product.component.html', 
  styleUrls: ['./new-product.component.css'] 
}) 
export class NewProductComponent implements OnInit { 
 
  constructor() { } 
 
  ngOnInit() { 
  } 
 
  submitProduct(form: NgForm) { 
    console.log(form.value); 
 
  } 
}