import { Product } from "@/types/product";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const gql = String.raw;

let dummyProducts = [
    {
        id: "c15d2c45-81a7-4a32-88f7-a4b6c7d01725",
        title: "Fortuner",
        description: "Experience the power and performance of the Fortuner with its advanced powertrain and high-performance features, all backed by Toyota’s legendary reliability.",
        price: 500,
        discountPercentage: 0,
        rating: 4,
        stock: 10,
        brand: "Toyota",
        category: "SUV",
        prompt: "A white Fortuner parked in an urban area at night with city lights in the background.",
        thumbnail: "https://res.cloudinary.com/ddj5gisb3/image/upload/v1696665430/Nextjs%20AI%20generated%20images/Fortuner.png.jpg",
        images: []
    },
    {
        id: "c70d3483-63e5-44ad-8ae0-eb241d8873d6",
        title: "Check Shirt with Pocket Square",
        description: "Style up with this simple yet trendy check shirt by Sauvage. It comes with a pocket square for added fashion.",
        price: 29.99,
        discountPercentage: 10,
        rating: 4.7,
        stock: 82,
        brand: "Sauvage",
        category: "Shirts",
        thumbnail: "https://res.cloudinary.com/ddj5gisb3/image/upload/v1696665511/Nextjs%20AI%20generated%20images/Check-Shirt-with-Pocket-Square.png.jpg",
        images: [
            "https://example.com/checkshirt_01.jpg",
            "https://example.com/checkshirt_02.jpg",
            "https://example.com/checkshirt_03.jpg"
        ]
    }
]

const typeDefs = gql`
   type Query {
    getProducts : [product]
   }

   type Mutation {
    createProduct (product : productInputType) : product 
    deleteProduct (id : String) : String
    updateProduct(id: String, product: productInput) : product
   }
   input productInput {
    title: String
    description: String
    price: Float
    discountPercentage: Float
    rating: Float
    stock: Int
    brand: String
    category: String
    prompt: String
    thumbnail: String
    images: [String]
   }

   input productInputType {
    id : String
    title: String!
    description: String!
    price: Float!
    discountPercentage: Float!
    rating: Float!
    stock: Int!
    brand: String!
    category: String!
    prompt: String!
    thumbnail: String!
    images: [String!]!
   }

   type product {
    id: String
    title: String
    description: String
    price: Float
    discountPercentage : Float
    rating : Float
    stock : Int
    brand : String
    category : String
    thumbnail : String
    images : [image]
   }
   type image {
    url: String
   }
`

const resolvers = {
    Query: {
        getProducts: () => {
            return dummyProducts
        }
    },
    Mutation: {
        createProduct: (root: {}, args: { product: {} }, context: {}, info: {}) => {
            dummyProducts.push(args.product as any);
            return args.product
        },
        deleteProduct: (root: {}, args: { id: String }, context: {}, info: {}) => {
            dummyProducts = dummyProducts.filter(product => product.id !== args.id);
            return `Product deleted Successfully at id ${args.id}`
        },
        updateProduct: (root: {}, args: { id: string, product: Product[] }, context: {}, info: {}) => {
            const { id, product: updatedProductData } = args;
            // Find the index of the product with the given id in the dummyProducts array
            const productIndex = dummyProducts.findIndex(product => product.id === id);

            // If the product with the given id is found
            if (productIndex !== -1) {
                // Update the product properties with the provided options
                dummyProducts[productIndex] = {
                    ...dummyProducts[productIndex],
                    ...updatedProductData,
                    id: dummyProducts[productIndex].id, // Ensure the id remains the same
                };

                // Return the updated product
                return dummyProducts[productIndex];
            }

            // If the product with the given id is not found, throw an error
            throw new Error(`Product with ID ${id} not found`);
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };