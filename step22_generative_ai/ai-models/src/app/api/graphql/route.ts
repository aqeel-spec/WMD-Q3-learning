import { CreateProduct, Product } from "@/types/product";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { db } from "@/lib/db/drizzle";
import { AiProducts } from "@/lib/db/types";
import { products } from "@/lib/db/schema/aiProducts";
import { asc, desc, eq } from "drizzle-orm";

const gql = String.raw;
const { v4: uuidv4 } = require('uuid');


const typeDefs = gql`
   type Query {
    getProducts : [product]
   }

   type Mutation {
    createProduct (product : createProduct) : product 
    deleteProduct (id : String!) : DeleteProductResult
    updateProduct(id: String, product: productInput) : product
   }

   type DeleteProductResult {
        product: product
        message: String
    }

   input createProduct {
    title : String
    price : Float
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
        getProducts: async () => {
            const productList = await db.query.products.findMany({
                orderBy: [desc(products.created_at)],
            });
            return productList
        }
    },
    Mutation: {
        createProduct: async (root: {}, args: { product: CreateProduct }, context: {}, info: {}) => {
            // dummyProducts.push(args.product as any);

            const aiGenerated = await fetch(`${process.env.URL}api/models`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: args.product.title,
                    price: args.product.price
                })
            })
            const jsonResult = await aiGenerated.json();
            if (!aiGenerated.ok) {
                return "Something happen while generating ai product"
            }

            const insertToDb = await db.insert(products).values(jsonResult.data).returning();
            return insertToDb[0]
        },
        deleteProduct: async (root: {}, args: { id: String }, context: {}, info: {}) => {
            const deletedProduct = await db.delete(products)
                .where(eq(products.id, args.id as any))
                .returning();
            console.log("deleteProductId", args.id)
            if (deletedProduct.length > 0) {
                return { message: "Deleted product successfully", product: deletedProduct[0] }
            } else {
                return { message: "No product found against your id", product: null }
            }
        },
        updateProduct: async (root: {}, args: { id: string, product: Product }, context: {}, info: {}) => {

            const updatedProduct = await db.update(products)
                .set(args.product)
                .where(eq(products.id, args.id))
                .returning();
            if (updatedProduct.length > 0) {
                return updatedProduct[0]
            }
            return null
        }
    },
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };