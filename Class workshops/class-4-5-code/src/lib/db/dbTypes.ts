import { InferModel } from 'drizzle-orm';
import { class_4_5_user } from './schema/user';
export type User = InferModel<typeof class_4_5_user>  // user types
export type NewUser = InferModel <typeof class_4_5_user , "insert" > // add new user to db