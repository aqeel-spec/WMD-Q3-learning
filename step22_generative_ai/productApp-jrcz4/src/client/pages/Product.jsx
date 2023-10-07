import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProducts from '@wasp/queries/getProducts';
import createProduct from '@wasp/actions/createProduct';
import updateProduct from '@wasp/actions/updateProduct';
import deleteProduct from '@wasp/actions/deleteProduct';

export function ProductPage() {
  const { data: products, isLoading, error } = useQuery(getProducts);
  const createProductFn = useAction(createProduct);
  const updateProductFn = useAction(updateProduct);
  const deleteProductFn = useAction(deleteProduct);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    brand: ''
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateProduct = () => {
    createProductFn({
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      brand: newProduct.brand
    });
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      brand: ''
    });
  };

  const handleEditProduct = (productId, updatedProduct) => {
    updateProductFn({ id: productId, ...updatedProduct });
  };

  const handleDeleteProduct = (productId) => {
    deleteProductFn({ productId });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Create Product</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Name"
            className="px-2 py-1 border rounded mr-2"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="px-2 py-1 border rounded mr-2"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="px-2 py-1 border rounded mr-2"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Category"
            className="px-2 py-1 border rounded mr-2"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Brand"
            className="px-2 py-1 border rounded mr-2"
            value={newProduct.brand}
            onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
          />
          <button
            onClick={handleCreateProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Products</h2>
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 p-4 mb-4 rounded-lg"
          >
            <div className="mb-2">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded" />
            </div>
            <div className="mb-2">Name: {product.name}</div>
            <div className="mb-2">Description: {product.description}</div>
            <div className="mb-2">Price: ${product.price}</div>
            <div className="mb-2">Category: {product.category}</div>
            <div className="mb-2">Brand: {product.brand}</div>
            <div className="flex">
              <button
                onClick={() => handleEditProduct(product.id, { name: 'Updated Product' })}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}