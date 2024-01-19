import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import mongoose, { mongo } from "mongoose";

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};
const postRegister = asyncHandler(async (req, res) => {
  const { userName, password, email } = req.body;

  if (!password || password.length < 7) {
    res.status(400);
    throw new Error("Enter password. It must have at least 7 symbols!");
  }

  const salt = await bcrypt.genSalt(9);
  const saltyPassword = await bcrypt.hash(password, salt);

  const userProfile = {
    userName,
    password: saltyPassword,
    email,
  };

  try {
    const dbProfile = await User.create(userProfile);
    const token = genToken(dbProfile.id);
    res.cookie("token", token, {
      maxAge: 44200000,
      httpOnly: true,
    });

    res.status(201);
    res.json({
      id: dbProfile.id,
      userName,
      email,
      token,
    });
  } catch (error) {
    if (
      error instanceof mongoose.Error.CastError ||
      error instanceof mongoose.Error.ValidationError ||
      error instanceof mongo.MongoServerError
    ) {
      res.status(400);
      if (error.name == "MongoServerError" && error.code == 11000) {
        throw new Error("User with provided email already exists");
      }
      throw new Error(error.message);
    } else {
      res.status(500);
      console.log(error);
      throw new Error(
        "It's not your fault, it's just a server has some problems"
      );
    }
  }
});

const postLogin = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400);
    throw new Error("No username or password provided!");
  }

  const userdata = await User.findOne({ userName });
  if (userdata && (await bcrypt.compare(password, userdata.password))) {
    const userToken = genToken(userdata.id);
    res.cookie("token", userToken, {
      maxAge: 44200000,
      httpOnly: true,
    });
    res.status(200);
    res.json({
      id: userdata.id,
      userName: userdata.userName,
      email: userdata.email,
      token: userToken,
    });
  } else {
    res.status(400);
    throw new Error("Enter valid password and/or username");
  }
});

export { postRegister, postLogin };
