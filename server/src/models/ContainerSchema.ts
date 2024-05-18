import mongoose from "mongoose";
import { Schema, Model, Types } from "mongoose";

export interface Container {
  id: number;
  projectId: number;
  name: string;
}

export const ContainerSchema = new Schema<Container, Model<Container>>({
  id: { type: Number, required: false },
  projectId: { type: Number, required: true },
  name: { type: String, required: true },
});

export const ContainerModel = mongoose.model("containers", ContainerSchema);
