import React, { useState } from 'react';
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
    createProductFn(newProduct);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      brand: ''
    });
  };

  return (
    <div className='p-4'>
      <div className='flex gap-4 mb-4'>
        <input
          type='text'
          placeholder='Name'
          className='px-2 py-1 border rounded'
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type='text'
          placeholder='Description'
          className='px-2 py-1 border rounded'
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type='number'
          placeholder='Price'
          className='px-2 py-1 border rounded'
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type='text'
          placeholder='Category'
          className='px-2 py-1 border rounded'
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type='text'
          placeholder='Brand'
          className='px-2 py-1 border rounded'
          value={newProduct.brand}
          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
        />
        <button
          onClick={handleCreateProduct}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Product
        </button>
      </div>

      {products.map((product) => (
        <div
          key={product.id}
          className='bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <img
            src={product.image}
            alt={product.name}
            className='w-32 h-32 object-contain mb-4'
          />
          <div className='mb-2'>
            <span className='font-semibold'>Name:</span> {product.name}
          </div>
          <div className='mb-2'>
            <span className='font-semibold'>Description:</span> {product.description}
          </div>
          <div className='mb-2'>
            <span className='font-semibold'>Price:</span> ${product.price}
          </div>
          <div className='mb-2'>
            <span className='font-semibold'>Category:</span> {product.category}
          </div>
          <div className='mb-2'>
            <span className='font-semibold'>Brand:</span> {product.brand}
          </div>
          <div className='flex justify-end'>
            <button
              onClick={() => deleteProductFn({ productId: product.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2'
            >
              Delete
            </button>
            <button
              onClick={() => updateProductFn({
                productId: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                brand: product.brand
              })}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}