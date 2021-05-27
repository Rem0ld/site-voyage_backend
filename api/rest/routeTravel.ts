import { Travel } from "@prisma/client";
import express from "express";
import joi, { ObjectSchema, AnySchema } from "joi";
import {
  createTravel,
  deleteTravel,
  getAllTravel,
  getAllTravelUser,
  getOneTravel,
  updateTravelDone,
} from "../../index";
const router = express.Router();

router.get("/all", (req, res) => {
  getAllTravel().then((travels) => res.send(travels));
});

router.post("/all", (req, res) => {
  const email: string = req.body.email;
  getAllTravelUser(email).then((travels) => res.send(travels));
});

router.post("/one", (req, res) => {
  const id = req.body.id;
  getOneTravel(id).then((travel) => res.send(travel));
});

router.post("/new", (req, res, next) => {
  // Needs validation with joi here
  const newTravel: Travel = req.body;

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    destination: joi.string().required().trim(),
    userId: joi.number().required(),
    fromCountry: joi.string().allow("").trim(),
    departureDate: joi.date().allow(""),
    returnDate: joi.date().allow(""),
  });

  const { error } = schemaUser.validate(newTravel);
  if (error) {
    return next(error.details);
  }

  createTravel(newTravel)
    .then((result) => {
      console.log("Travel created", result);
      res.status(200)
      return res.send(result);
    })
    .catch((error) => {
      res.status(500);
      return res.send(error);
    });
});

router.post("/delete", (req, res) => {
  const id = req.body.id;

  deleteTravel(id)
    .then(() => {
      res.status(200)
      return res.send("Ok");
    })
    .catch((error) => {
      res.status(500);
      console.error("Error delete travel", error);
      return res.send("error");
    });
});

router.post("/update-done", (req, res) => {
  const id: number = req.body.id;

  updateTravelDone(id)
    .then(() => {
      res.status(200)
      return res.send("Ok");
    })
    .catch((error) => {
      res.status(500);
      console.error("Error update travel", error)
      return res.send("error");
    });
});

export default router;
