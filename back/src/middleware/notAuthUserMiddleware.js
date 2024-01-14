import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const noteAuth = asyncHandler(async (req, res, next) => {
  let token = (req.cookies && req.cookies.token) || null;
  let user = null;

  console.log(token);
  if (token) {
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decodeToken.id).select("-password");
    } catch (error) {
      res.status(401);
      throw new Error("You are not authorized -_- ");
    }
  }
  if (!token || !user) {
    res.status(401);
    throw new Error("You are not authorized -_- ");
  }
  req.user = user;
  next();
});

export default noteAuth;
