import { gql } from "@apollo/client";


export const productQuery = gql`
    query GetProducts {
        getProducts {
            brand
            category
            description
            title
            id
            brand
            thumbnail
            price
        }
    }
` 
