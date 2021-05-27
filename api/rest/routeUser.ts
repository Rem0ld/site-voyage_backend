import { PrismaClient, User } from "@prisma/client";
import express from "express";
import joi, { ObjectSchema, AnySchema } from "joi";
import {
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
  getOneUser,
  disconnect,
} from "../../index";
const prisma = new PrismaClient()
const router = express.Router();

router.get("/all", (req, res) => {
  getAllUser().then((users) => res.send(users));
  disconnect();
});

router.post("/one", (req, res) => {
  const email = req.body.email;
  getOneUser(email).then((user) => res.send(user));
  disconnect()
});

router.post("/new", (req, res, next) => {
  // Needs validation with joi here
  const newUser: User = req.body;

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    username: joi.string().alphanum().min(3).max(30).required().trim(),
    email: joi.string().email().trim(),
    city: joi.string().allow("").trim(),
    zip: joi.string().max(5).allow("").trim(),
  });

  const { error } = schemaUser.validate(newUser);
  if (error) {
    console.log("error validation");
    next(error)
  }


  createUser(newUser).then((result) => {
    res.status(200);
    console.log("User created")
    return res.json(result);
  }).catch((error) => {
    return res.json(error)
  })
});

router.post("/delete", (req, res, next) => {
  const { email } = req.body;

  deleteUser(email)
    .then(() => {
      res.status(200);
      console.log("User deleted")
      return res.send("Ok");
    })
    .catch((error) => {
      console.error(error)
      res.status(404);
      return res.json(error)
    });
});

router.post("/update-address", (req, res, next) => {
  const user: User = req.body;

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    id: joi.number(),
    country: joi.string().trim(),
    city: joi.string().trim(),
    zip: joi.string().max(5).allow("").trim(),
  });

  const { error } = schemaUser.validate(user);
  if (error) {
    res.status(500);
    next(error)
  }

  updateUser(user)
    .then((result) => {
      console.log("User updated", result)
      return res.json(result);
    })
    .catch((error) => {
      res.status(404);
      return res.json(error)
    });
});

export default router;
