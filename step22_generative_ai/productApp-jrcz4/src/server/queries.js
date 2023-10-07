import HttpError from '@wasp/core/HttpError.js'

export const getProduct = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const product = await context.entities.Product.findUnique({
    where: { id: args.productId, userId: context.user.id },
    include: { user: true }
  })

  if (!product) {
    throw new HttpError(400)
  }

  return product
}

export const getProducts = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  return context.entities.Product.findMany({
    where: { userId: context.user.id },
    select: {
      id: true,
      description: true,
      price: true,
      image: true,
      category: true,
      brand: true
    }
  })
}
