import { objectType } from "nexus"
import { DateScalar } from "./Datetime";
import { JSONScalar } from "./Json";


export const Country = objectType({
  name: "Country",
  definition(t) {
    t.id("id"),
      t.string("numericCode"),
      t.field("createdAt", {
        type: DateScalar,
      }),
      t.field("updatedAt", {
        type: DateScalar,
      }),
      t.string("name"),
      t.nullable.string("capital"),
      t.list.nonNull.string("topLevelDomain"),
      t.nullable.string("alpha2Code"),
      t.nullable.string("alpha3Code"),
      t.list.nonNull.string("callingCodes"),
      t.list.nonNull.string("altSpellings"),
      t.nullable.string("region"),
      t.nullable.string("subregion"),
      t.nullable.int("population"),
      t.list.nonNull.int("latlng"),
      t.nullable.string("demonym"),
      t.nullable.string("area"),
      t.nullable.int("gini"),
      t.list.nonNull.string("timezones"),
      t.list.nonNull.string("borders"),
      t.nullable.string("nativeName"),
      t.list.field("currencies", {
        type: JSONScalar
      }),
      t.list.field("languages", {
        type: JSONScalar
      }),
      t.list.field("translations", {
        type: JSONScalar
      }),
      t.nullable.string("flag"),
      t.list.field("regionalBlocks", {
        type: JSONScalar
      }),
      t.nullable.string("cioc")
  }
})