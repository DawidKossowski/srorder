import {Product} from "../product-list/product";

export class Order {
    id: number;
    date: Date;
    products: Array<Product>;
}
