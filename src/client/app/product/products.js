import {inject} from "aurelia-framework";
import {ProductService} from "./product.service";

@inject(ProductService)
export class Products {

    constructor(productService) {
       this.productService = productService; 
    }
    
    activate() {
        return this.productService
            .getAll()
            .then((products) => this.products = products);
    }
}
