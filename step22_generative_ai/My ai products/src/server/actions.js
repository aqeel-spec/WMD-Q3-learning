import HttpError from '@wasp/core/HttpError.js'

export const createProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Product.create({
    data: {
      description: args.description,
      price: args.price,
      category: args.category,
      brandName: args.brandName,
      image: args.image,
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
      category: args.category,
      brandName: args.brandName,
      image: args.image
    }
  });
}

export const deleteProduct = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id }
  });
  if (product.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Product.delete({
    where: { id }
  });

  return true;
}