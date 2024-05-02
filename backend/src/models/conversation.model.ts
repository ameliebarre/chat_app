import mongoose from "mongoose";
import { IConversation } from "../interfaces";

export interface IConversationModel extends IConversation, Document {}

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<IConversationModel>(
  "Conversation",
  ConversationSchema,
);
