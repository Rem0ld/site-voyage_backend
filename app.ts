/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express, { NextFunction } from "express";
import cors from "cors";
import user from "./api/rest/routeUser";
import travel from "./api/rest/routeTravel";
import picture from "./api/rest/routePicture";
import country from "./api/rest/routeCountry";
import review from "./api/rest/routeReview";
import notification from "./api/rest/routeNotification";
import helmet from "helmet";
import multer from "multer";
const upload = multer({ dest: 'public/images' })

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/review", review);
app.use("/travel", travel);
app.use("/country", country);
app.use("/picture", picture);
app.use("/notification", notification);

app.use(
  (
    err: Error,
    _req: any,
    res: { send: (arg0: string) => void },
    _next: NextFunction
  ) => {

    console.error(err)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (err[0].message) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return res.json({ "error": err[0].message });

    } else {
      return res.send(err.message)
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
