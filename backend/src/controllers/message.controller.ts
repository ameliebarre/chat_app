import { Response, NextFunction } from "express";

import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import { RequestWithUser } from "../interfaces";

export const sendMessage = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    Promise.all([conversation.save(), newMessage.save()]);

    await conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};
