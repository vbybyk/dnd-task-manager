import mongoose, { Schema, Document } from "mongoose";
import { TaskModel } from "./TaskSchema";
import { ContainerModel } from "./ContainerSchema";
import { LabelModel } from "./LabelSchema";

export interface Project extends Document {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
}

const ProjectSchema = new Schema<Project>({
  id: { type: Number, required: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
});

ProjectSchema.pre("remove", async function(next) {
  const doc = this as any;
  await TaskModel.deleteMany({ projectId: doc.id });
  await ContainerModel.deleteMany({ projectId: doc.id });
  await LabelModel.deleteMany({ projectId: doc.id });
  next();
});

export const ProjectModel = mongoose.model("Project", ProjectSchema);
