import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GetProduct, Product } from "@/types/product";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import SkeletonForm from './Skelton';
import { updateGeneratedProduct } from '@/lib/graphql/mutations/updateGeneratedProduct';
import LoadingDots from '../LoadingDots';
import { DialogClose } from '@radix-ui/react-dialog';
import { productQuery } from '@/lib/graphql/gqlQueries';





// const initialData: UpdateProduct = {
//     price: 300,
//     title: "Rose",
//     brand: "Nature's beauty",
//     category: "Flowers",
//     description: "A beautiful rose with vibrant colors for everyone.",
//     discountPercentage: 0,
//     id: "7157db58-2447-416b-b8a2-2bc6d5ec8c3c",
//     stock: 12,
//     rating: 4.7,
//     thumbnail: "https://res.cloudinary.com/ddj5gisb3/image/upload/v1696723431/Nextjs%20AI%20generated%20images/Rose.png.jpg",
//     prompt: '',
//     images: []
// };
interface ProductF {
    createProduct: Product
}
type Props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    product: ProductF
    isLoading: boolean
}

const UpdateGeneratedModel: React.FC<Props> = ({ isOpen, setIsOpen, isLoading, product }) => {
    const { register, handleSubmit, control, setValue } = useForm<Product>();

    React.useEffect(() => {
        if (product && product.createProduct) {
            const defaultValues = product.createProduct;

            // Set default values for each form field
            setValue("title", defaultValues.title);
            setValue("description", defaultValues.description);
            setValue("price", Number(defaultValues.price));
            setValue("discountPercentage", defaultValues.discountPercentage);
            setValue("rating", defaultValues.rating);
            setValue("stock", defaultValues.stock);
            setValue("brand", defaultValues.brand);
            setValue("category", defaultValues.category);
            setValue("prompt", defaultValues.prompt);
            setValue("thumbnail", defaultValues.thumbnail);
            setValue("images", defaultValues.images);
        }
    }, [product, setValue]);
    const [mutateFunction, { data, loading, error }] = useMutation(updateGeneratedProduct);

    const onSubmit = async (data: Product) => {

        try {
            const createProduct = await mutateFunction({
                variables: {
                    updateProductId: product?.createProduct?.id, // Use the product's original ID
                    product: data
                },
                refetchQueries : [{
                    query: productQuery,
                    variables: {}
                }]
            })
            // Handle success or show a success message if needed
            // setIsOpen(false);
            toast.success("Product updated successfully");
        } catch (error) {
            console.error("Mutation error:", error);
            // Handle the error, e.g., display an error message
        } finally {
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent className="lg:max-w-[90%] max-w-auto sm:max-w-xl md:max-w-[75%]">
                <DialogHeader>
                    <DialogTitle>Your AI generated Product</DialogTitle>
                    <DialogDescription>
                        You can update all other data if needed.
                    </DialogDescription>
                </DialogHeader>
                {/* skeleton effect when data ai is generating product */}
                {
                    isLoading ? (
                        <SkeletonForm  />
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4">
                            <div className="flex flex-col  items-center">
                                {/* AI generated image */}
                                <div className="p-8">
                                    <Image
                                        alt={"title"}
                                        src={product?.createProduct?.thumbnail}
                                        width={300}
                                        height={300}
                                        className="shadow-2xl bg-white  
                        rounded-xl p-4 shadow-red-800"
                                    />
                                </div>
                                {/* Description */}
                                <div className="grid  pb-4 w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="description">Product description</Label>
                                    <Textarea
                                        className="w-full"
                                        rows={4}
                                        cols={50}
                                        maxLength={1000}
                                        required
                                        {...register("description")}
                                    />
                                </div>
                            </div>
                            {/* Form section */}
                            <div className="flex bg-white/40 flex-col">
                                <div className="grid pb-2 w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="title">Product Title</Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        {...register("title")}
                                    />
                                </div>
                                <div className="grid pb-2 w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="price">Product Price</Label>
                                    <Input
                                        type="number"
                                        id="price"
                                        {...register("price")}
                                    />
                                </div>
                                <div className="flex pb-2 gap-4">
                                    {/* brand update  */}
                                    <div className="grid pb-2 w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="brand">Product Brand</Label>
                                        <Input
                                            type="text"
                                            id="brand"
                                            {...register("brand")}
                                        />
                                    </div>
                                    {/* category update */}
                                    <div className="grid pb-2 w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="price">Product Category</Label>
                                        <Input
                                            type="text"
                                            id="category"
                                            {...register("category")}
                                        />
                                    </div>
                                </div>
                                <div className="flex pb-2 gap-4">
                                    {/* discountPercentage */}
                                    <div className="grid pb-2 w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="discountPercentage">Product discountPercentage</Label>
                                        <Input
                                            type="number"
                                            id="discountPercentage"
                                            {...register("discountPercentage")}
                                        />
                                    </div>
                                    {/* update stock */}
                                    <div className="grid pb-2 w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="stock">Product Stock</Label>
                                        <Input
                                            type="number"
                                            id="stock"
                                            {...register("stock")}
                                        />
                                    </div>
                                </div>
                                {/* update rating */}
                                <div className='flex '>
                                    <label className='mr-4'>Rate This:</label>
                                    <Controller
                                        name="rating"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="rating">
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <label key={value}>
                                                        <input
                                                            type="radio"
                                                            {...field}
                                                            value={value}
                                                        />
                                                        &#9733; {/* Unicode character for a star (★) */}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    />
                                </div>



                                <Button className="mt-4" type="submit">
                                    {loading ? (
                                        <LoadingDots className='h-2 w-2 text-white bg-white ' />
                                    ) : "Update Changes"}
                                </Button>
                                <DialogClose>
                                    <Button className="mt-4" type="button">Cancel </Button>
                                </DialogClose>

                            </div>
                        </form>
                    )
                }

            </DialogContent>
        </Dialog>
    );
};

export default UpdateGeneratedModel;
