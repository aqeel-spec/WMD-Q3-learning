import React from 'react';
import { GetProduct } from '@/types/product'; // Import your product type
import Image from 'next/image';
import { Button } from './ui/button';
import  EditPopover  from './EditPopover';
import DeleteProduct from './DeleteProduct';


const ProductCard = ({ product }: { product: GetProduct }) => {
    const { thumbnail, title } = product && product;
    const truncatedDescription = product?.description?.slice(0, 60)

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden m-4 w-auto  ">
            <Image
                src={thumbnail == "" || null ? ""  : thumbnail }
                alt={product?.title}
                height={100}
                width={200}
                // layout="responsive"
                priority
                className="w-full"
            />
            <div className="p-4  min-h-[260px] flex justify-between flex-col ">
                <div className="">
                    <h1 className="text-xl font-semibold mb-2">{title}</h1>
                    {/* brand */}
                    <div className="flex justify-between text-base font-bold ">
                        <h2> Brand : </h2>
                        <p className="text-gray-600 mb-2">{product?.brand}</p>
                    </div>
                    <div className="flex justify-between text-base font-bold ">
                        <h2> Category : </h2>
                        <p className="text-gray-600 mb-2">{product?.category}</p>
                    </div>
                    <p className="text-gray-800 mb-4">{truncatedDescription}{product?.description?.length > 60 ? "..." : ""}</p>
                </div>
                <div className="flex justify-between items-end">
                    <p className="text-xl font-bold">${product.price}</p>
                    <div className="flex items-center">
                       <EditPopover product={product && product} />
                        {/* delete product */}
                        <DeleteProduct id={product?.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
