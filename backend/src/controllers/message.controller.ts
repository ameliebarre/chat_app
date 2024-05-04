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

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
