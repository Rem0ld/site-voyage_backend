import { objectType } from "nexus"
import { Country } from "./Country"
import { User } from "./User"

export const Picture = objectType({
  name: "Picture",
  definition(t) {
    t.id("id"),
      t.string("destination"),
      t.string("fromCountry"),
      t.field("user", {
        type: User,
      }),
      t.field("country", {
        type: Country,
      }),
      t.string("url")
  }
})