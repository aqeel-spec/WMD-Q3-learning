import HttpError from '@wasp/core/HttpError.js'

export const createProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Product.create({
    data: {
      name: args.name,
      description: args.description,
      price: args.price,
      category: args.category,
      brand: args.brand,
      image: args.image,
      userId: context.user.id
    }
  });
}

export const updateProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: args.productId }
  });
  if (product.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Product.update({
    where: { id: args.productId },
    data: {
      name: args.name,
      description: args.description,
      price: args.price,
      category: args.category,
      brand: args.brand,
      image: args.image
    }
  });
}

export const deleteProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: args.productId }
  });
  if (product.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Product.delete({
    where: { id: args.productId }
  });
}