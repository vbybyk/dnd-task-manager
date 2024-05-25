import mongoose from "mongoose";
import { Schema, Model, Types } from "mongoose";

interface Label {
  label: string;
  value: string;
}

export interface Task {
  id: number;
  projectId: number;
  containerId: number;
  sortId: number;
  name: string;
  description: string;
  labels?: Types.DocumentArray<Label>;
  priority: string;
  images?: Types.DocumentArray<string>;
}

export const TaskSchema = new Schema<Task, Model<Task>>({
  id: { type: Number, required: true },
  projectId: { type: Number, required: true },
  containerId: { type: Number, required: true },
  sortId: { type: Number, required: false },
  name: { type: String, required: false },
  description: { type: String, required: false },
  labels: [{ label: String, value: String }],
  priority: { type: String, required: false },
  images: [{ type: String, required: false }],
});

export const TaskModel = mongoose.model("tasks", TaskSchema);

// module.exports = TaskModel
