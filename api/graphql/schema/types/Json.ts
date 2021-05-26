import { scalarType } from "nexus";

export const JSONScalar = scalarType({
  name: "JSON",
  asNexusMethod: "json",
  description: "JSON scalar type",
})