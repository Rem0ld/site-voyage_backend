import express from "express";
const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const authMiddleware = require("../../firebase/auth-middleware");

import multer from "multer";
const upload = multer({ dest: 'public/images' })

router.post("/save", upload.single("picture"), (req, res, next) => {
  console.log(req.body, req.file)
});


export default router;