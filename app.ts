import { User } from ".prisma/client";
import express from "express";
import { createUser, deleteUser, getAllUser, updateUser } from "./index";
import cors from "cors";
import schemaUser from "./schemaJoi/User";
import joi, { AnySchema, ObjectSchema } from "joi";

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

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    username: joi.string().alphanum()
      .min(3)
      .max(30)
      .required(),
    email: joi.string().email(),
    city: joi.string().allow(""),
    zip: joi.string().max(5).allow("")
  })

  const { error } = schemaUser.validate(newUser)
  if (error) {
    res.send(error?.details)
  }

  createUser(newUser).then((result) => {
    console.log(result)
    res.send(result);

  }).catch(error => {
    res.status(400)
    res.send("error")
    console.error(error)
  });
})

app.post("/delete-user", (req, res) => {
  // Needs validation with joi here
  const userId = req.body;

  deleteUser(userId).then(() => {
    res.send("Ok");

  }).catch(error => {
    // check status code
    res.status(400)
    res.send("error")
    console.error(error)
  });
})

app.post("/update-user-address", (req, res) => {
  const user: User = req.body;

  const schemaUser: ObjectSchema<AnySchema> = joi.object({
    id: joi.number(),
    country: joi.string().trim(),
    city: joi.string().trim(),
    zip: joi.string().max(5).allow("").trim()
  })

  const { error } = schemaUser.validate(user);
  if (error) {
    res.send(error.details);
  }

  updateUser(user).then((result) => {
    res.send(result);

  }).catch(error => {
    // check status code
    res.status(400)
    res.send("error")
    console.error(error)
  });
})

app.post("/delete-user", (req, res) => {
  const user: User = req.body;

  deleteUser(user).then(() => {
    res.send("Ok");
  }).catch(error => {
    // check status code
    res.status(400)
    res.send("error")
    console.error(error)
  });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})