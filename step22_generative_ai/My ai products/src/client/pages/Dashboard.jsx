import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProducts from '@wasp/queries/getProducts';
import createProduct from '@wasp/actions/createProduct';

export function DashboardPage() {
  const { data: products, isLoading, error } = useQuery(getProducts);
  const createProductFn = useAction(createProduct);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);

  const handleCloseModal = () => {
    setIsOpen(false);
    setTitle('');
    setPrice(0);
  };

  const handleSubmitProduct = () => {
    createProductFn({ title, price });
    handleCloseModal();
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Product
        </button>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-gray-100 p-4 rounded-lg'
          >
            <div className='mb-4'>
              <img src={product.image} alt={product.title} className='w-full h-auto' />
            </div>
            <div className='text-xl font-bold mb-2'>{product.title}</div>
            <div className='text-gray-500 mb-2'>
              <span className='font-bold'>Description: </span>{product.description}
            </div>
            <div className='text-gray-500 mb-2'>
              <span className='font-bold'>Price: </span>${product.price}
            </div>
            <div className='text-gray-500 mb-2'>
              <span className='font-bold'>Category: </span>{product.category}
            </div>
            <div className='text-gray-500 mb-2'>
              <span className='font-bold'>Brand Name: </span>{product.brandName}
            </div>
            <div className='flex justify-end'>
              <button className='text-blue-500'>Edit</button>
              <button className='text-red-500 ml-2'>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          onClose={handleCloseModal}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>&#8203;</span>

            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
                        Add Product
                      </Dialog.Title>
                      <div className='mt-2'>
                        <div className='mb-4'>
                          <input
                            type='text'
                            placeholder='Title'
                            className='px-3 py-2 border rounded w-full'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='number'
                            placeholder='Price'
                            className='px-3 py-2 border rounded w-full'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    onClick={handleSubmitProduct}
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}