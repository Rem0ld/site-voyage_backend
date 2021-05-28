/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express, { NextFunction } from "express";
import cors from "cors";
import user from "./api/rest/routeUser";
import travel from "./api/rest/routeTravel";

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/travel", travel);

app.use(
  (
    err: Error,
    _req: any,
    res: { send: (arg0: string) => void },
    _next: NextFunction
  ) => {

    console.log(err)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (err[0].message) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return res.json({ "error": err[0].message });

    } else {
      return res.send("Something broke")
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
