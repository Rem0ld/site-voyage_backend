/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { enumType, extendType, intArg, mutationField, nonNull, objectType, queryField } from "nexus"
import { DateScalar } from "./Datetime"

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id"),
      t.field("createdAt", {
        type: DateScalar,
      }),
      t.field("updatedAt", {
        type: DateScalar,
      }),
      t.string("email"),
      t.string("username"),
      t.string("country"),
      t.string("city"),
      t.string("zip")
    t.field("role", { type: RoleEnum })
  }
})

const RoleEnum = enumType({
  name: 'RoleEnum',
  members: {
    ADMIN: 0,
    USER: 1,
  },
})


export const UserQuery = queryField((t) => {
  t.list.field('getAllUser', {
    type: 'User',
    resolve(_root, args, ctx) {
      return ctx.prisma.user
        .findMany()
    },
  })

  t.field('getOneUser', {
    type: 'User',
    args: {
      id: nonNull(intArg())
    },
    resolve(_root, args, ctx) {
      return ctx.prisma.user
        .findUnique({
          where: {
            id: args.id
          }
        })
    },
  })
})

export const createUser = mutationField('createUser', {
  type: "User",
  args: {

  }
  resolve(root, args, ctx) {
    return ctx.prisma.user.create({
      data: 
    })
  },
})