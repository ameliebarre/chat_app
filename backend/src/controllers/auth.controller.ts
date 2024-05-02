import { RequestHandler } from "express";
import { hash } from "bcrypt";

import User from "../models/user.model";
import HttpError from "../utils/httpError";

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

    const hashPassword = await hash(password, 12);

    let user = new User({
      firstname,
      lastname,
      username,
      gender: gender ? gender : "male",
      avatar: gender === "male" ? boyAvatarPic : girlAvatarPic,
      email,
      password: hashPassword,
    });

    console.log("USER : ", user);

    let savedUser = await user.save();

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

export const login: RequestHandler = (req, res) => {
  console.log("Login");
};

export const logout: RequestHandler = (req, res) => {
  console.log("Logout");
};
