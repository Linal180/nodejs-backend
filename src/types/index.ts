import { Request } from "express";
import { UserDTO } from "../dto";

export type RequestWithUser = Request & {
  user: UserDTO
}