import mongoose from "mongoose";
import { Schema, Model } from "mongoose";

export interface Label {
  id: number;
  projectId: number;
  label: string;
  value: string;
}

export const LabelSchema = new Schema<Label, Model<Label>>({
  id: { type: Number, required: true },
  projectId: { type: Number, required: true },
  label: { type: String, required: true },
  value: { type: String, required: true },
});

export const LabelModel = mongoose.model("labels", LabelSchema);
