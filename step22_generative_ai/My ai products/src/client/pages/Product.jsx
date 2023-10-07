import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProduct from '@wasp/queries/getProduct';
import updateProduct from '@wasp/actions/updateProduct';
import deleteProduct from '@wasp/actions/deleteProduct';

export function Product() {
  const { productId } = useParams();

  const { data: product, isLoading, error } = useQuery(getProduct, { productId });
  const updateProductFn = useAction(updateProduct);
  const deleteProductFn = useAction(deleteProduct);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    description: '',
    price: 0,
    category: '',
    brandName: '',
    image: ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProduct({
      description: product.description,
      price: product.price,
      category: product.category,
      brandName: product.brandName,
      image: product.image
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProduct({
      description: '',
      price: 0,
      category: '',
      brandName: '',
      image: ''
    });
  };

  const handleSaveEdit = () => {
    updateProductFn({
      id: productId,
      ...editedProduct
    });
    setIsEditing(false);
    setEditedProduct({
      description: '',
      price: 0,
      category: '',
      brandName: '',
      image: ''
    });
  };

  const handleDelete = () => {
    deleteProductFn({ id: productId });
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div className='flex items-center justify-between'>
          <div>{product.name}</div>
          <div>{product.price}</div>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div>
            <img src={product.image} alt={product.name} className='w-full h-auto rounded-lg' />
          </div>
          <div>
            <p>{product.description}</p>
            <p>{product.category}</p>
            <p>{product.brandName}</p>
          </div>
        </div>
        <div className='mt-4'>
          {!isEditing && (
            <div>
              <button
                onClick={handleEdit}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
              >
                Delete
              </button>
            </div>
          )}
          {isEditing && (
            <div>
              <input
                type='text'
                placeholder='Description'
                className='px-1 py-2 border rounded'
                value={editedProduct.description}
                onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              />
              <input
                type='number'
                placeholder='Price'
                className='px-1 py-2 border rounded'
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
              />
              <input
                type='text'
                placeholder='Category'
                className='px-1 py-2 border rounded'
                value={editedProduct.category}
                onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
              />
              <input
                type='text'
                placeholder='Brand Name'
                className='px-1 py-2 border rounded'
                value={editedProduct.brandName}
                onChange={(e) => setEditedProduct({ ...editedProduct, brandName: e.target.value })}
              />
              <input
                type='text'
                placeholder='Image URL'
                className='px-1 py-2 border rounded'
                value={editedProduct.image}
                onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })}
              />
              <div>
                <button
                  onClick={handleSaveEdit}
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}