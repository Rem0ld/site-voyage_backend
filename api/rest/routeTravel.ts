import { Travel } from "@prisma/client";
import express from "express";
import joi, { ObjectSchema, AnySchema } from "joi";
import {
  createNotification,
  createTravel,
  deleteTravel,
  getAllTravel,
  getAllTravelUser,
  getOneTravel,
  updateTravelDone,
} from "../../index";
const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const authMiddleware = require("../../firebase/auth-middleware");

router.use("/", authMiddleware);

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
    departureDate: joi.date().allow(null),
    returnDate: joi.date().allow(null),
  });

  const { error } = schemaUser.validate(newTravel);
  if (error) {
    return next(error.details);
  }

  createTravel(newTravel)
    .then((result) => {
      console.log("Travel created", result);

      if (result.departureDate) {
        const aWeekBeforeDeparture = new Date(
          result.departureDate.getTime() - 60 * 60 * 24 * 7 * 1000
        );

        const notification = {
          travelId: result.id,
          userId: result.userId,
          dateSendNotification: aWeekBeforeDeparture,
        };
        createNotification(notification)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => console.error(error));
      }

      return res.status(200).json({
        type: "valid",
        body: result,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        type: "error",
        error: error,
      });
    });
});

router.post("/delete", (req, res) => {
  const id = req.body.id;

  deleteTravel(id)
    .then(() => {
      res.status(200);
      return res.json({
        type: "valid",
      });
    })
    .catch((error) => {
      res.status(500);
      console.error("Error delete travel", error);
      return res.json({
        type: "error",
        error: error,
      });
    });
});

router.post("/update-done", (req, res) => {
  const id: number = req.body.id;

  updateTravelDone(id)
    .then(() => {
      res.status(200);
      return res.send("Ok");
    })
    .catch((error) => {
      res.status(500);
      console.error("Error update travel", error);
      return res.send("error");
    });
});

export default router;
