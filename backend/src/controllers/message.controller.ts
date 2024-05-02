import { RequestHandler, Response } from "express";

export const sendMessage: RequestHandler = (req, res, next) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
  } catch (error) {
    next(error);
  }
};
