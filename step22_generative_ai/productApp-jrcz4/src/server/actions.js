import HttpError from '@wasp/core/HttpError.js'

export const createProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Product.create({
    data: {
      description: args.description,
      price: args.price,
      image: args.image,
      category: args.category,
      brand: args.brand,
      userId: context.user.id
    }
  });
}

export const updateProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: args.id }
  });
  if (product.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Product.update({
    where: { id: args.id },
    data: {
      description: args.description,
      price: args.price,
      image: args.image,
      category: args.category,
      brand: args.brand
    }
  });
}

export const deleteProduct = async ({ productId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });
  if (product.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Product.delete({
    where: { id: productId }
  });
}
