import {Product} from '../product-list/product';
import {Address} from '../User/Address';

export class Order {
    id: number;
    date: Date;
    products: Array<Product>;
    address: Address;
}
