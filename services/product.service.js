const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class ProductService {

    constructor() {
        this.products = [];
        this.generate()
    }

    generate() {
        const limit = 100;
        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.database.mongodbObjectId(),
                name: faker.commerce.productName(),
                price: +faker.commerce.price(),
                image: faker.image.url(),
                isBlock: faker.datatype.boolean()
            })
        }
    }

    create(data) {
        const newProduct = {
            id: faker.database.mongodbObjectId(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.products);
            }, 5000)
        })
    }

    async findOne(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw boom.notFound("product not found");
        }
        if(product.isBlock){
            throw boom.conflict("product is block")
        }
        return product;
    }

    update(id, changes) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw boom.notFound("product not found");
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];
    }

    delete(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw boom.notFound("product not found");
        }
        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = ProductService;