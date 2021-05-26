import { objectType } from "nexus"
import { User } from "./User"

export const Notification = objectType({
  name: "Notification",
  definition(t) {
    t.id("id"),
      t.field("user", {
        type: User,
      }),
      t.int('travelId')
  }
})
