// services/products.service.js
import productModel from '../models/product.model.js';

const findAll = async () => productModel.getAll();

const findById = async (id) => productModel.getById(id);

const create = async (productData) => {
  // parsear price para evitar que venga como string
  const price = Number(productData.price);
  if (!productData.name || isNaN(price)) {
    const error = new Error('Nombre y precio válido son requeridos.');
    error.status = 400;
    throw error;
  }

  const productWithTimestamp = {
    ...productData,
    price,
    createdAt: new Date().toISOString()
  };

  return productModel.add(productWithTimestamp);
};

const remove = async (id) => productModel.deleteById(id);

export default { findAll, findById, create, remove };
