
import { gql } from "@apollo/client";


export const updateQuery = gql`
    mutation UpdateProduct($updateProductId: String, $product: productInput) {
        updateProduct(id: $updateProductId, product: $product) {
            id
            title
            brand
            category
            price
            description
        }
    }
` 
