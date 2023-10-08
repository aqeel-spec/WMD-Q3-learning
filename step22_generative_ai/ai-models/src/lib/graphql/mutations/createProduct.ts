
import { gql } from "@apollo/client";


export const createQuery = gql`
    mutation CreateProduct($product: createProduct) {
        createProduct(product: $product) {
            price
            title
            brand
            category
            description
            discountPercentage
            id
            stock
            rating
            thumbnail
        }
    }
` 
