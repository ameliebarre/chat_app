import { RequestHandler, Response } from "express";
import { matchedData } from "express-validator";
import { compare, genSalt, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

import User from "../models/user.model";
import HttpError from "../utils/httpError";

//GENERATE TOKEN FOR LOGIN
const generateJWT = async (userId: Types.ObjectId, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // In milliseconds
    httpOnly: true, // Prevents XSS attacks
    sameSite: "strict", // CSRF attacks, cross-site requests, forgery attacks...
    secure: process.env.NODE_ENV !== "development",
  });
};

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password, gender } = req.body;

    // Check if user exists
    const userExists = await User.exists({ email });

    if (userExists) {
      throw new HttpError({
        title: "emailAddress",
        detail: "Email address is already used",
        code: 422,
      });
    }

    const boyAvatarPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlAvatarPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    let newUser = new User({
      firstname,
      lastname,
      username,
      gender: gender ? gender : "male",
      avatar: gender === "male" ? boyAvatarPic : girlAvatarPic,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    await generateJWT(newUser._id, res);

    let savedUser = await newUser.save();

    return res.status(201).json({
      _id: savedUser._id,
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
      username: savedUser.username,
      email: savedUser.email,
      avatar: savedUser.avatar,
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    let bodyData = matchedData(req, {
      includeOptionals: true,
      locations: ["body"],
    });

    const { email, password } = bodyData;

    let user = await User.findOne({ email });
    const isValidPass = await compare(password, user?.password || "");

    if (!user || !isValidPass) {
      throw new HttpError({
        title: "bad_login",
        detail: "You have entered an invalid email address or password",
        code: 400,
      });
    }

    // Generate token
    await generateJWT(user._id, res);

    res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res) => {
  console.log("Logout");
};
