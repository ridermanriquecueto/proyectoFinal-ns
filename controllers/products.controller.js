import productService from "../services/products.service.js";

const getAllProducts = async (req, res, next) => {
    try {
        const data = await productService.findAll();
        res.json(data);
    } catch (err) {
        next(err);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const data = await productService.findById(req.params.id);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.create(req.body);
        res.json(product);
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const data = await productService.remove(req.params.id);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct
};
