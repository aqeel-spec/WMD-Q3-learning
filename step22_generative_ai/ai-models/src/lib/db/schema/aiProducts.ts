import { pgTable, serial, text, doublePrecision , timestamp} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: text('id').notNull(),
    title: text('title'),
    description: text('description'),
    price: doublePrecision('price'),
    discountPercentage: doublePrecision('discountPercentage').notNull(),
    rating: doublePrecision('rating'),
    stock: doublePrecision('stock'),
    brand: text('brand'),
    category: text('category'),
    prompt: text('prompt'),
    thumbnail: text('thumbnail'),
    images: text('image').array(), /// update this in array []
    created_at: timestamp('created_at').defaultNow(),
});
