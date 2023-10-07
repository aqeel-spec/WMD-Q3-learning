import { InferInsertModel } from 'drizzle-orm';
import { aiProducts } from './schema/aiProducts'

export type AiProducts = InferInsertModel<typeof aiProducts>;