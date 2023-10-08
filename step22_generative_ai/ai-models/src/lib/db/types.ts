import { InferInsertModel } from 'drizzle-orm';
import { products } from './schema/aiProducts'

export type AiProducts = InferInsertModel<typeof products>;