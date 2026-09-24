import "express-session";
import { User } from "../models/user.model";

declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}
