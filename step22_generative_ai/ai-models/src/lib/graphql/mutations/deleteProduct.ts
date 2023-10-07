
import { gql } from "@apollo/client";


export const deleteQuery = gql`
    mutation DeleteProduct($deleteProductId: String!) {
        deleteProduct(id: $deleteProductId) {
        message
        product {
            brand
            price
            rating
            title
        }
        }
    }
` 
