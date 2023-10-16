"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createQuery } from "@/lib/graphql/mutations/createProduct"
import toast from "react-hot-toast"
import UpdateGeneratedModel from "./UpdateModel";
import { DialogClose } from "@radix-ui/react-dialog";
import { productQuery } from "@/lib/graphql/gqlQueries";


type CreateProduct = {
    title: string,
    price: number | string
}

export function CreateModel() {

    const { register, handleSubmit } = useForm<CreateProduct>({
        defaultValues: {
            title: "",
            price: 0
        }
    });
    const [mutateFunction, { data, loading, error }] = useMutation(createQuery);
    console.log("🚀 ~ file: CreateModel.tsx:38 ~ CreateModel while gPro. ~ error:", error)
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async (formData: CreateProduct) => {
        console.log("🚀 ~ file: CreateModel.tsx:41 ~ onSubmit ~ formData:", formData)
        setIsOpen((pre) => !pre);

        try {
            toast.loading("Generating product ...");
            const createProduct = await mutateFunction({
                variables: {
                    product: {
                        title: formData?.title,
                        price: parseFloat(formData?.price as any)
                    }
                },
                refetchQueries: [{
                    query: productQuery,
                    variables: {}
                }]
            })
            console.log("🚀 ~ file: CreateModel.tsx:57 ~ onSubmit ~ createProduct:", createProduct)
        } catch (error) {
            console.error("Mutation error:", error);
            // Handle the error, e.g., display an error message
        } finally {
            toast.dismiss();
        }

    }

    if (error) {
        console.error(error)
        return null
    }




    return (
        <>
            <UpdateGeneratedModel isOpen={isOpen} isLoading={loading} setIsOpen={setIsOpen} product={data && data} />
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Product</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Generate AI product</DialogTitle>
                        <DialogDescription>
                            Enter the name of any product then we will generate it for U.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="title">Product Title</Label>
                            <Input
                                type="title"
                                id="title"
                                {...register("title")}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="title">Product Price</Label>
                            <Input
                                type="price"
                                id="price"
                                {...register("price")}
                            />
                        </div>
                        <DialogClose>
                            <DialogFooter>
                                <Button type="submit">Generate Now</Button>
                            </DialogFooter>
                        </DialogClose>

                    </form>

                </DialogContent>
            </Dialog>
        </>
    )
}
