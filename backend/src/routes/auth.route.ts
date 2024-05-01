import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";

const _router = express.Router();

_router.post("/signup", signup);

_router.get("/login", login);

_router.get("/logout", logout);

export const router = _router;
