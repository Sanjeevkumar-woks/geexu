import {
  genPassword,
  addUser,
  getUserByName,
  getUserByEmail,
  getUsersByFilter,
  getAllUsers,
  deleteUserByDisplay_name,
  updatePassword,
} from "../helper.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validation } from "../middleware/validationMiddleware.js";
import {
  userLogInSchema,
  userSingInSchema,
} from "../validations/userValidation.js";
import { auth_admin } from "../middleware/auth.js";
import nodemailer from "nodemailer";

const router = express.Router();
dotenv.config();

//Signup
router.post(
  "/api/v2/people/create",
  validation(userSingInSchema),
  async (req, res) => {
    const { display_name, email, password } = req.body;
    const isUserExist = await getUserByName(display_name);
    if (isUserExist) {
      res.status(400).send({ msg: "display_name alrady taken" });
      return;
    }
    if (
      !/^(?=.*[0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@!#%&]).{8,}$/g.test(
        password
      )
    ) {
      res.status(400).send({ msg: "Password pattern doesnot match" });
      return;
    }
    const hashPassword = await genPassword(password);

    var d = new Date(),
      dformat =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
        " " +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
    const newUser = {
      created_at: dformat,
      display_name: display_name,
      email: email,
      password: hashPassword,
      role: {
        key: "user",
        rank: Math.floor(Math.random() * 100),
      },
      updated_at: dformat,
      blogs: [],
    };

    const result = await addUser(newUser);
    console.log(newUser);
    res.send({ msg: "Sucessfull signup", newUser });
  }
);

//Login
router.post(
  "/api/v2/people/authenticate",
  validation(userLogInSchema),
  async (req, res) => {
    const { email, password } = req.body;
    const userFromDb = await getUserByEmail(email);
    if (!userFromDb) {
      res.status(400).send({ msg: "Invalid credentials" });
      return;
    }
    const sotredDbPassword = userFromDb.password;

    const isPasswordMatch = await bcrypt.compare(password, sotredDbPassword);

    if (!isPasswordMatch) {
      res.status(400).send({ msg: "Invalid credentials" });
      return;
    }
    const token =
      userFromDb.role.key == "user"
        ? jwt.sign({ id: userFromDb._id }, process.env.USER_JWT_SECRET)
        : jwt.sign({ id: userFromDb._id }, process.env.ADMIN_JWT_SECRET);

    const result = { authentication_token: token, person: { ...userFromDb } };

    res.send({ msg: "Sucessfull Login", result });
  }
);

//search
router.get("/api/v2/people/search", auth_admin, async (req, res) => {
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const users = await getUsersByFilter(req);
  res.send(users);
});

//get All users
router.get("/api/v2/people/users",auth_admin, async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});

//delete user
router.delete("/api/v2/people/users/:display_name",auth_admin, async (req, res) => {
  const { display_name } = req.params;
  const movie = await deleteUserByDisplay_name(display_name);
  res.send(movie);
});

router.route("/forgotpassword").post(async (request, response) => {
  const { email } = request.body;
  let userFromDb = await getUserByEmail({ email });
  if (!userFromDb) {
    return response
      .status(400)
      .send({ msg: "Invalid login credentials : mailid" });
  }
  const token = jwt.sign({ id: userFromDb._id }, process.env.USER_JWT_SECRET);
  const replacePassword = await updatePassword({ email, token });

  let updatedResult = await getUserByEmail({ email });
  Mail(token, email);
  return response.send({ updatedResult, token });
});

router.route("/forgotpassword/verify").get(async (request, response) => {
  const token = await request.header("x-auth-token");

  const tokenVerify = await getUserByEmail({ Password: token });

  if (!tokenVerify) {
    return response.status(400).send({ msg: "Invalid Credentials" });
  } else {
    return response.send({ msg: "Matched" });
  }
});

router.route("/updatepassword").post(async (request, response) => {
  const { Password, token } = request.body;

  if (Password.length < 8) {
    return response.status(401).send({ msg: "Password Must be longer" });
  }
  const data = await getUserByEmail({ Password: token });

  if (!data) {
    return response.status(401).send({ msg: "Invalid credentials" });
  }
  const { email } = data;

  const hashedPassword = await genPassword(Password);

  const passwordUpdate = await updatePassword({
    email,
    Password: hashedPassword,
  });
  const result = await getUserByEmail({ email });

  return response.send(result);
});

function Mail(token, email) {
  console.log(token, email);
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  const link = `http://localhost:3000/forgotpassword/verify/${token}`;

  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: "Mail from the Server",
    html: `<a href=${link}>Click the link to reset the password</a>`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("err");
    } else {
      console.log("status", info.response);
    }
  });
}

export const userRouter = router;

export const usersRouter = router;
