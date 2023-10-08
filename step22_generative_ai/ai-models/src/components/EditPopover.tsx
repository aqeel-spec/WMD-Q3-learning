import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,

} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import { GetProduct } from "@/types/product";
import { useForm } from "react-hook-form";
// update data from previous
import { gql, useMutation } from '@apollo/client';
import { updateQuery } from "@/lib/graphql/mutations/updateData";
import LoadingDots from "./LoadingDots";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";


type Props = {
    product: GetProduct;
};

const EditPopover: React.FC<Props> = ({ product }) => {
    const { register, handleSubmit } = useForm<GetProduct>({
        defaultValues: product,
    });
    const [mutateFunction, { data, loading, error }] = useMutation(updateQuery);
    const [isOpen, setIsOpen] = useState(false);


    const onSubmit = async (formData: GetProduct) => {
        setIsOpen(true)
        try {
            // Execute the mutation
            const result = await mutateFunction({
                variables: {
                    updateProductId: product.id, // Use the product's original ID
                    product: {
                        title: formData.title,
                        brand: formData.brand,
                        category: formData.category,
                        price: Number(formData.price) , // Ensure the price is parsed as a float
                        description: formData.description,
                    },
                },
            });

            // Handle success or show a success message if needed
        } catch (error) {
            console.error("Mutation error:", error);
            // Handle the error, e.g., display an error message
        } finally {
            setIsOpen(false)
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen} >
            <PopoverTrigger asChild>
                <Button className="mr-2">Edit</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Edit product data</h4>
                        <h4 className="font-medium leading-none">Image is not changeable</h4>
                        <p className="text-sm text-muted-foreground">
                            These product are only for testing purpose
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                type="title"
                                id="title"
                                {...register("title")}
                            />
                        </div>
                        {/* brand */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="brand">Brand</Label>
                            <Input
                                id="brand"
                                type="text"
                                {...register("brand")}
                                className="col-span-2 h-8"
                            />
                        </div>
                        {/* category */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                type="text"
                                {...register("category")}
                                className="col-span-2 h-8"
                            />
                        </div>
                        {/* price */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                {...register("price")}
                                className="col-span-2 h-8"
                            />
                        </div>
                        {/* description */}
                        <div className="grid w-full gap-2">
                            <Textarea
                                className="w-full"
                                rows={4}
                                cols={50}
                                maxLength={1000}
                                required
                                id="description"
                                {...register("description")}
                            />
                        </div>
                        {/* data update button */}
                        <Button type="submit"> {loading ? (<LoadingDots className="h-2 w-2 bg-white " />) : "Save changes"} </Button>

                    </form>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default EditPopover;

