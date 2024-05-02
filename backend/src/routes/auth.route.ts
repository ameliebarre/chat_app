import express from "express";

import { login, logout, signup } from "../controllers/auth.controller";
import validate from "../middlewares/validation.middleware";
import {
  emailAddress,
  loginPassword,
  password,
} from "../validators/auth.validator";

const _router = express.Router();

_router
  .route("/signup")
  .post(
    validate([
      emailAddress(),
      password("password"),
      password("confirmPassword"),
    ]),
    signup,
  );

_router
  .route("/login")
  .post(validate([emailAddress(), loginPassword()]), login);

_router.get("/logout", logout);

export const router = _router;
