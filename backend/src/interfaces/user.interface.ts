import { Request } from "express";

interface IUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export { IUser };
