import { Router } from 'express';
import productsController from '../controllers/products.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, productsController.getAllProducts);
router.get('/:id', verifyToken, productsController.getProductById);
router.post('/create', verifyToken, productsController.createProduct);
router.delete('/:id', verifyToken, productsController.deleteProduct);

export default router;
