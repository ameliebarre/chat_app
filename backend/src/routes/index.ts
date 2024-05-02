import { NextFunction, Response, Router } from "express";

import { router as AuthRouter } from "../routes/auth.route";
import { router as MessageRouter } from "../routes/message.route";

const _router: Router = Router();

// Define API version
_router.use(function (_, res: Response, next: NextFunction) {
  res.setHeader("Api-Version", "v1");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  next();
});

_router.use("/auth", AuthRouter);
_router.use("/messages", MessageRouter);

export const router = _router;
