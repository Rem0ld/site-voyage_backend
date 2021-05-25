import joi, { AnySchema, ObjectSchema } from "joi";

const schemaUser: ObjectSchema<AnySchema> = joi.object({
  username: joi.string().alphanum()
    .min(3)
    .max(30)
    .required(),
  email: joi.string().email(),
  city: joi.string().allow(""),
  zip: joi.string().max(5).allow("")
})

export default {
  schemaUser
}