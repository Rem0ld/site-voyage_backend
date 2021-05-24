import { User } from ".prisma/client";
import express from "express";
import { createUser, getAllUser } from "./index";
import cors from "cors";

const app = express();
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/user", (req, res) => {
  getAllUser().then((users) => res.send(users));
})

app.post("/new-user", (req, res) => {
  // Needs validation with joi here
  const newUser: User = req.body;
  createUser(newUser).then((result) => {
    console.log(result)
    res.send(result);

  }).catch(error => {
    res.status(400)
    res.send("error")
    console.error(error)
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})