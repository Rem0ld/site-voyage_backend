import { objectType } from "nexus"
import { Country } from "./Country"
import { User } from "./User"

export const Review = objectType({
  name: "Review",
  definition(t) {
    t.id("id"),
      t.string("comment"),
      t.int("score"),
      t.field("user", {
        type: User,
      }),
      t.field("country", {
        type: Country,
      }),
      t.string("url")
  }
})