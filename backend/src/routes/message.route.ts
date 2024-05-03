import express from "express";

import { sendMessage } from "../controllers/message.controller";
import authenticateJWT from "../middlewares/auth.middleware";

const _router = express.Router();

_router.post("/send/:id", authenticateJWT as any, sendMessage as any);

export const router = _router;
