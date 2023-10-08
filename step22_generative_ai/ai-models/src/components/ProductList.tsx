"use client";
import { productQuery } from "@/lib/graphql/gqlQueries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { GetProduct } from "@/types/product";
import SkeletonProductCard from './skeleton/SkeletonProductCard';

const ProductList = () => {

    const { loading, error, data } = useQuery(productQuery);
    if (loading) return (
        <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {
                [1, 2, 3, 4, 5].map((s, index) => (
                    <SkeletonProductCard key={index} />
                ))
            }
        </div>
    );
    if (error) return <p>Error :</p>;

    return (
        <div className=" py-16 m-10">
            <h1 className=" md:text-3xl text-xl py-5 lg:text-4xl md:py-10 font-sans text-center font-black "> All AI genereated Products  </h1>
            <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {data?.getProducts?.map((product: GetProduct) => (
                    //<Link href={`/#product/${product.id}`} key={product.id}>
                        <ProductCard product={product} />
                   // </Link>
                ))}
            </div>
        </div>
    )
}

export default ProductList