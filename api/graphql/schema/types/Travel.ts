import { objectType } from "nexus"
import { User } from "./User"

export const Travel = objectType({
  name: "Travel",
  definition(t) {
    t.id("id"),
      t.string("destination"),
      t.string("fromCountry"),
      t.field("user", {
        type: User,
      }),
      t.boolean("done")
  }
})