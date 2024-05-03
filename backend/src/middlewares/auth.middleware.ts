import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";

import HttpError from "../utils/httpError";
import User from "../models/user.model";
import { DataStoredInToken, RequestWithUser } from "../interfaces";

const authenticateJWT = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new HttpError({
        title: "unauthorized",
        detail: "Unauthorized - No token provided",
        code: 401,
      });
    }

    const decodedToken = verify(
      token,
      process.env.JWT_SECRET || "",
    ) as DataStoredInToken;

    if (!decodedToken) {
      throw new HttpError({
        title: "unauthorized",
        detail: "Unauthorized - Invalid token",
        code: 401,
      });
    }

    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    next(
      new HttpError({
        title: "wrong_token",
        detail: "Wrong authentication token",
        code: 401,
      }),
    );
  }
};

export default authenticateJWT;
