import { NextFunction, Request, Response, Router } from "express";
import { router as AuthRouter } from "./auth.route";

const _router: Router = Router();

// Define API version
_router.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Api-Version", "v1");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  next();
});

_router.use("/v1/auth", AuthRouter);

export const router = _router;
