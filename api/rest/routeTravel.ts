import { Travel } from "@prisma/client";
import express from "express";
import joi, { ObjectSchema, AnySchema } from "joi";
import {
  createTravel,
  deleteTravel,
  getAllTravel,
  getOneTravel,
  updateTravelDone,
} from "../../index";
const router = express.Router();

router.get("/all", (req, res) => {
  getAllTravel().then((travels) => res.send(travels));
});

router.post("/one", (req, res) => {
  const id = req.body.id;
  getOneTravel(id).then((travel) => res.send(travel));
});

router.post("/new", (req, res) => {
  // Needs validation with joi here
  const newTravel: Travel = req.body;

  console.log(newTravel);

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    destination: joi.string().required(),
    userId: joi.number().required(),
    fromCountry: joi.string().allow(""),
    departureDate: joi.date().allow(""),
    returnDate: joi.date().allow(""),
  });

  const { error } = schemaUser.validate(newTravel);
  if (error) {
    res.send(error?.details);
    return;
  }

  createTravel(newTravel)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      res.status(400);
      res.send("error");
      console.error(error);
    });
});

router.post("/delete", (req, res) => {
  const id = req.body.id;

  deleteTravel(id)
    .then(() => {
      res.send("Ok");
    })
    .catch((error) => {
      // check status code
      res.status(400);
      res.send("error");
      console.error(error);
    });
});

router.post("/update-done", (req, res) => {
  const id: number = req.body.id;


  updateTravelDone(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      // check status code
      res.status(400);
      res.send("error");
      console.error(error);
    });
});

export default router;
