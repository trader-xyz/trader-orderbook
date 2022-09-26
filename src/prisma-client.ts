import { PrismaClient } from '@prisma/client'

let prismaSingleton: PrismaClient | null

const getPrismaClient = (): PrismaClient => {
  if (!prismaSingleton) {
    prismaSingleton = new PrismaClient({
      // log: ['query', 'info', 'warn', 'error'],
    })
  }
  return prismaSingleton
}

export { getPrismaClient }
