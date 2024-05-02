import mongoose from "mongoose";
import { IUser } from "../interfaces";

export interface IUserModel extends IUser, Document {}

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUserModel>("User", UserSchema);
