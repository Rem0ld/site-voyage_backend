import { Country } from "@prisma/client";
import express from "express";
import joi, { ObjectSchema, AnySchema } from "joi";
import {
  createCountry,
  deleteCountry,
  getAllCountry,
  getOneCountry,
  getOneCountryPerName,
} from "../../index";
const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const authMiddleware = require("../../firebase/auth-middleware");

router.get("/all", (req, res) => {
  getAllCountry().then((country) => res.send(country));
});

router.post("/one", (req, res) => {
  const numericCode = req.body.numericCode;

  getOneCountry(numericCode).then((country) => {
    console.log(country)
    res.send(country)
  });
});

router.post("/one-name", (req, res) => {
  const name = req.body.name;

  getOneCountryPerName(name).then((country) => {
    console.log(country)
    res.send(country)
  });
});

router.post("/new", (req, res, next) => {
  if (req.body.review) {
    delete req.body.review;
  }
  if (req.body.picture) {
    delete req.body.picture;
  }
  const newCountry: Country = req.body;

  getOneCountry(newCountry.numericCode).then(result => {
    if (result) return res.status(409).json({
      type: "error",
      error: "Country already exists"
    })

    createCountry(newCountry)
      .then((result) => {
        if (result) {
          console.log("Country created", result);

          return res.status(200).json({
            type: "valid",
            body: result
          });
        }
      })
      .catch((error) => {
        throw error
      });
  }).catch((error) => {
    console.error("country couldn't be created", error)
    return res.status(500).json({
      type: "error",
      error: error
    });
  });

});

// router.post("/delete", (req, res) => {
//   const id = req.body.id;

//   deleteTravel(id)
//     .then(() => {
//       res.status(200)
//       return res.json({
//         type: "valid",
//       });
//     })
//     .catch((error) => {
//       res.status(500);
//       console.error("Error delete travel", error);
//       return res.json({
//         type: "error",
//         error: error
//       });
//     });
// });

// router.post("/update-done", (req, res) => {
//   const id: number = req.body.id;

//   updateTravelDone(id)
//     .then(() => {
//       res.status(200)
//       return res.send("Ok");
//     })
//     .catch((error) => {
//       res.status(500);
//       console.error("Error update travel", error)
//       return res.send("error");
//     });
// });

export default router;
