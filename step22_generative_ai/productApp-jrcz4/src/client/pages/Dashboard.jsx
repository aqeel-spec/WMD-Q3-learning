import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProducts from '@wasp/queries/getProducts';
import createProduct from '@wasp/actions/createProduct';
import updateProduct from '@wasp/actions/updateProduct';
import deleteProduct from '@wasp/actions/deleteProduct';

export function DashboardPage() {
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

  const handleCreateProduct = () => {
    createProductFn(newProduct);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      brand: ''
    });
  };

  const handleUpdateProduct = (productId, updatedProduct) => {
    updateProductFn({ productId, ...updatedProduct });
  };

  const handleDeleteProduct = (productId) => {
    deleteProductFn({ productId });
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="px-1 py-2 border rounded text-lg"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="px-1 py-2 border rounded text-lg"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="px-1 py-2 border rounded text-lg"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Category"
          className="px-1 py-2 border rounded text-lg"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Brand"
          className="px-1 py-2 border rounded text-lg"
          value={newProduct.brand}
          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
        />
        <button
          onClick={handleCreateProduct}
          className="bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded"
        >
          Add Product
        </button>
      </div>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg"
        >
          <div>
            <img src={product.image} alt={product.name} className="w-20 h-20" />
          </div>
          <div>
            <div className="text-xl mb-2">{product.name}</div>
            <div className="text-lg mb-2">{product.description}</div>
            <div className="text-lg mb-2">Price: ${product.price}</div>
            <div className="text-lg mb-2">Category: {product.category}</div>
            <div className="text-lg mb-2">Brand: {product.brand}</div>
          </div>
          <div>
            <button
              onClick={() => handleUpdateProduct(product.id, { name: 'Updated Product' })}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}