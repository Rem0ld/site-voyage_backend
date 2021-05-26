import { User } from "@prisma/client";
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

router.post("/new", (req, res) => {
  // Needs validation with joi here
  const newUser: User = req.body;

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email(),
    city: joi.string().allow(""),
    zip: joi.string().max(5).allow(""),
  });

  const { error } = schemaUser.validate(newUser);
  if (error) {
    res.send(error?.details);
  }

  createUser(newUser)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      res.status(400);
      res.send("error");
      console.error(error);
    });
  disconnect()
});

router.post("/delete", (req, res) => {
  // Needs validation with joi here
  const userId = req.body;

  deleteUser(userId)
    .then(() => {
      res.send("Ok");
    })
    .catch((error) => {
      // check status code
      res.status(400);
      res.send("error");
      console.error(error);
    });
  disconnect()
});

router.post("/update-address", (req, res) => {
  const user: User = req.body;

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    id: joi.number(),
    country: joi.string().trim(),
    city: joi.string().trim(),
    zip: joi.string().max(5).allow("").trim(),
  });

  const { error } = schemaUser.validate(user);
  if (error) {
    res.send(error.details);
  }

  updateUser(user)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      // check status code
      res.status(400);
      res.send("error");
      console.error(error);
    });
  disconnect()
});

export default router;
