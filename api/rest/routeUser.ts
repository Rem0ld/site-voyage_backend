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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const authMiddleware = require("../../firebase/auth-middleware");

/**
 * Gets one user from email
 */
router.post("/one", (req, res) => {
  const email = req.body.email;
  getOneUser(email).then((user) => res.json(user));
  disconnect();
});


/**
 * Create a user
 */
router.post("/new", (req, res, next) => {
  // Needs validation with joi here
  const newUser: User = req.body;

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    username: joi.string().alphanum().min(3).max(30).required().trim(),
    email: joi.string().email().trim(),
    city: joi.string().allow("").trim(),
    zip: joi.string().max(5).allow("").trim(),
    country: joi.string().allow("").trim(),
  });

  const { error } = schemaUser.validate(newUser);
  if (error) {
    console.log("error joi create user", error);
    next(error);
  }

  createUser(newUser)
    .then((result) => {
      console.log("User created", result);
      return res.status(200).json({
        type: "valid",
        body: result,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        type: "error",
        error: error,
      });
    });
});

// We protect those routes
router.use("/", authMiddleware);

router.get("/all", (req, res) => {
  getAllUser().then((users) => res.send(users));
  disconnect();
});

/**
 * Deletes a user
 */
router.post("/delete", (req, res) => {
  const { email } = req.body;

  deleteUser(email)
    .then(() => {
      console.log("User deleted");
      return res.status(200).json({
        type: "valid",
        body: "Ok",
      });
    })
    .catch((error) => {
      console.error("User couldn't be deleted", error);
      return res.status(400).json({
        type: "error",
        error: error,
      });
    });
});


/**
 * Updates address of a user
 */
router.post("/update-address", (req, res, next) => {
  const { user } = req.body;
  console.log(user);

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    id: joi.number(),
    country: joi.string().trim(),
    city: joi.string().trim(),
    zip: joi.string().max(5).allow("").trim(),
  });

  const { error } = schemaUser.validate(user);
  if (error) {
    res.status(500);
    next(error);
  }

  updateUser(user)
    .then((result) => {
      console.log("User updated", result);
      return res.json(result);
    })
    .catch((error) => {
      res.status(404);
      return res.json(error);
    });
});

export default router;
