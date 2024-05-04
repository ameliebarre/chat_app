import { Request } from "express";
import { Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export { IUser };
