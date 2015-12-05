export class App {
    constructor() {
        this.year = new Date().getFullYear();
    }

    configureRouter(config, router) {

        this.router = router;


        config.map([
            {
                route: ["", "home"],
                name: "home",
                title: "Home",
                moduleId: "app/home/home",
                nav: true
            },
            {
                route: "about",
                name: "about",
                title: "About",
                moduleId: "app/about/about",
                nav: true

            },
            {
                route: "products",
                name: "product",
                title: "Products",
                moduleId: "app/product/products",
                nav: true
            }
                
        ]);
    }
}
