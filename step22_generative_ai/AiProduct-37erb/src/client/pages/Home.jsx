import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import createProduct from '@wasp/actions/createProduct';
import updateProduct from '@wasp/actions/updateProduct';
import deleteProduct from '@wasp/actions/deleteProduct';
import getProducts from '@wasp/queries/getProducts';

export function Product() {
  const { data: products, isLoading, error } = useQuery(getProducts);
  const createProductFn = useAction(createProduct);
  const updateProductFn = useAction(updateProduct);
  const deleteProductFn = useAction(deleteProduct);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    image: ''
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
      brand: '',
      image: ''
    });
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Name'
          className='px-1 py-2 border rounded text-lg'
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type='text'
          placeholder='Description'
          className='px-1 py-2 border rounded text-lg'
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type='number'
          placeholder='Price'
          className='px-1 py-2 border rounded text-lg'
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <input
          type='text'
          placeholder='Category'
          className='px-1 py-2 border rounded text-lg'
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type='text'
          placeholder='Brand'
          className='px-1 py-2 border rounded text-lg'
          value={newProduct.brand}
          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
        />
        <input
          type='text'
          placeholder='Image'
          className='px-1 py-2 border rounded text-lg'
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button
          onClick={handleCreateProduct}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Product
        </button>
      </div>
      <div>
        {products.map((product) => (
          <div
            key={product.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <div>
              <img src={product.image} alt={product.name} className='h-24 w-24' />
            </div>
            <div>
              <p>Name: {product.name}</p>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p>Brand: {product.brand}</p>
            </div>
            <div>
              <button
                onClick={() => updateProductFn(product)}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
              >
                Edit
              </button>
              <button
                onClick={() => deleteProductFn(product)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
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