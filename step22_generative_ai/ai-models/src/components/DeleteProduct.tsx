"use client"
import React from 'react'
import { Button } from './ui/button'
import { useMutation } from '@apollo/client';
import { deleteQuery } from '@/lib/graphql/mutations/deleteProduct';
import toast from 'react-hot-toast';
import LoadingDots from './LoadingDots';

type Props = {
    id : string 
}

const DeleteProduct : React.FC<Props> = ({id}) => {

    const [mutateFunction, { data, loading, error }] = useMutation(deleteQuery);

    const handleDelete = async () => {
        try {
            // Execute the mutation
            const result = await mutateFunction({
                variables: {
                    deleteProductId: id
                }
            });

            if (result) {
                toast.success(result.data.deleteProduct.message);
            }


            console.log("Mutation result:", result);

            // Handle success or show a success message if needed
        } catch (error) {
            console.error("Mutation error:", error);
            // Handle the error, e.g., display an error message
        } 
    };
    

    return (
        <Button onClick={handleDelete}>
            {loading ? (<LoadingDots className='h-2 w-2 bg-white' /> ) : "Delete"}
        </Button>
    )
}

export default DeleteProduct