import express from "express";
import {
  deleteNotification,
} from "../../index";
const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const authMiddleware = require("../../firebase/auth-middleware");

export default router;

router.use("/", authMiddleware);

router.post("/delete", (req, res) => {
  const travelId = req.body.travelId;

  deleteNotification(+travelId)
    .then(() => {
      res.status(200);
      return res.json({
        type: "valid",
      });
    })
    .catch((error) => {
      res.status(500);
      console.error("Error delete notification", error);
      return res.json({
        type: "error",
        error: error,
      });
    });
});
