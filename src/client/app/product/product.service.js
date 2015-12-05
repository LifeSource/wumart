import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = "/api/products/";

@inject(HttpClient)
export class ProductService {


    constructor(httpClient) {
        this.http = httpClient;
    }

    getAll() {
        return this.http
            .get(baseUrl)
            .then((response) => response.content);
    }

    getById(id) {
        return this.http
            .get(baseUrl + id)
            .then((response) => response.content);
    }
    
}
