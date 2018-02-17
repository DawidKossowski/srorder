import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  constructor() { }

  @Input() public productsName: Array<string>;
  @Output() private filterResult = new EventEmitter<string>();

  ngOnInit() {
  }

  getResult(result: string) {
    this.filterResult.emit(result);
  }

}
