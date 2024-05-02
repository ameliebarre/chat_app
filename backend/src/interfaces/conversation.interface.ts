import mongoose from "mongoose";

export interface IConversation {
  participants: Array<mongoose.Schema.Types.ObjectId>;
  messages: Array<mongoose.Schema.Types.ObjectId>;
}
