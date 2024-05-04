import express from "express";

import { sendMessage, getMessages } from "../controllers/message.controller";
import authenticateJWT from "../middlewares/auth.middleware";

const _router = express.Router();

_router.get("/:id", authenticateJWT as any, getMessages as any);
_router.post("/send/:id", authenticateJWT as any, sendMessage as any);

export const router = _router;
