import express from "express";
import cors from "cors";
import user from "./api/rest/routeUser";
import travel from "./api/rest/routeTravel"

const app = express();
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user)
app.use("/travel", travel)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})