import HttpError from '@wasp/core/HttpError.js'

export const getProduct = async ({ productId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: productId },
    include: { user: true }
  });

  if (!product) { throw new HttpError(404, 'Product not found'); }

  if (product.userId !== context.user.id) { throw new HttpError(400, 'Product does not belong to the user'); }

  return product;
}

export const getProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Product.findMany({
    where: {
      userId: context.user.id
    }
  });
}
