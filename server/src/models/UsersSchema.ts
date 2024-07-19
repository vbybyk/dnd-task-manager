import exp from "constants";
import mongoose from "mongoose";
import { Schema, Model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  id: number;
  name: string;
  email?: string;
  password?: string;
  profileImage?: string;
  job_title?: string;
  company?: string;
  location?: string;
  about?: string;
}

export const UserSchema = new Schema<IUser, Model<IUser>>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: false },
  profileImage: { type: String, required: false },
  job_title: { type: String, required: false },
  company: { type: String, required: false },
  location: { type: String, required: false },
  about: { type: String, required: false },
});

export const UserModel = mongoose.model("users", UserSchema);
