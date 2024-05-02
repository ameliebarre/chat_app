import express from "express";

import { sendMessage } from "../controllers/message.controller";

const _router = express.Router();

_router.post("/send/:id", sendMessage);

export const router = _router;
