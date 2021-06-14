import { Review } from "@prisma/client";
import express from "express";
import { createReview } from "../../index";
const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const authMiddleware = require("../../firebase/auth-middleware");

export default router;

router.post("/new", (req, res) => {
  const review: Review = req.body;
  console.log(review)
  createReview(review).then((result) => {
    console.log("review created", result)
    res.send(result).status(201)
  })
});

