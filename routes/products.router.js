const { Router } = require("express");
const ProductService = require("../services/product.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product.schema");
const router = Router();

const service = new ProductService();

router.get("/", async (req, res) => {
    const products = await service.find();
    res.status(200).json(products)
})

router.get("/filter", (req, res) => {
    res.send("Soy un mensaje")
})

router.get("/:id", validatorHandler, async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id);
        res.json(product);
    } catch (e) {
        next(e);
    }
})

router.post("/", (req, res) => {
    const body = req.body;
    const newProduct = service.create(body)
    res.status(201).json(newProduct)
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body)
        res.json(product);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.delete(id)
    res.json(product);
});

module.exports = router;