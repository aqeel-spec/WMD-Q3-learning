
import { gql } from "@apollo/client";


export const updateGeneratedProduct = gql`
    mutation UpdateProduct($updateProductId: String, $product: productInput) {
        updateProduct(id: $updateProductId, product: $product) {
            id
            title
            brand
            category
            price
            description
            discountPercentage
            rating
            stock
            thumbnail
        }
    }
` 
