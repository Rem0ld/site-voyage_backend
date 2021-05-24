import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()


export const getAllUser = async (): Promise<User[]> => {
  return await prisma.user.findMany();
}

export const createUser = async (user: User): Promise<User | Error> => {
  const newUser = await prisma.user.create({
    data: { ...user },
  }).catch((error) => { throw error })

  return newUser;
}

export async function disconnect() {
  await prisma.$disconnect();
}