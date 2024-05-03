import { Request } from "express";
import { IUser } from "./user.interface";
import { Types } from "mongoose";

export interface DataStoredInToken {
  userId: string;
}

export interface RequestWithUser extends Request {
  user: IUser & {
    _id?: Types.ObjectId;
  };
}
