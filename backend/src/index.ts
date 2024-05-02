import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";

import { router as apiRouter } from "./routes/index";
import config from "./config/config";
import HttpError from "./utils/httpError";

dotenv.config();

const router = express();
const port = process.env.API_PORT || 5000;

// Connection to Mongoose datatable
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.info(`Running on ENV = ${process.env.NODE_ENV}`);
    console.info("Connected to mongoDB.");
    startServer();
  })
  .catch((error) => {
    console.error("Unable to connect.");
    console.error(error);
  });

// Only start the server if Mongoose is connected
const startServer = async () => {
  router.use((req, res, next) => {
    console.info(
      `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
    );

    res.on("finish", () => {
      console.info(
        `Incomming -> Method: [${req.method}] - Url: [${req.url}] IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`,
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // API routes
  router.use("/api", apiRouter);

  // Parse the incoming requests with JSON payloads (from req.body)
  router.use(express.json());

  // API main router
  router.get("/", (_, res) => {
    res.status(200).json({
      success: true,
      message:
        "Chat App is ready. You should not have further access from here.",
    });
  });

  // API error handling
  router.use((req, res, next) => {
    const error = new Error("not found");
    console.error(error);
    return res.status(404).json({ success: false, message: error.message });
  });

  // Handle all errors thrown by controllers
  router.use(function (err: any, req: any, res: any, next: any) {
    console.error(err.stack);

    if (err instanceof HttpError) {
      return err.sendError(res);
    } else {
      return res.status(500).json({
        error: {
          title: "general_error",
          detail: "An error occurred, Please retry again later",
          code: 500,
        },
      });
    }
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      console.info(`Server is running on port ${config.server.port}.`),
    );
};

// router.get("/", (req, res) => {
//   res.send("Server is ready !");
// });

// router.use("/api/auth", authRoutes);

// // Below route is triggered when any error is thrown
// router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({ message: err.message });
// });

// router.listen(port, () => {
//   dbConnect();
//   console.log(`Server is running on http://localhost:${port}`);
// });
