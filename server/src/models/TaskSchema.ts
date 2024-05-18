import mongoose from "mongoose";
import { Schema, Model, Types } from "mongoose";

interface Label {
  label: string;
  value: string;
  key: string;
}

export interface Task {
  id: number;
  projectId: number;
  containerId: number;
  sortId: number;
  name: string;
  description: string;
  label?: Types.DocumentArray<Label>;
  priority: string;
  img?: string;
}

export const TaskSchema = new Schema<Task, Model<Task>>({
  id: { type: Number, required: true },
  projectId: { type: Number, required: true },
  containerId: { type: Number, required: true },
  sortId: { type: Number, required: false },
  name: { type: String, required: false },
  description: { type: String, required: false },
  label: [{ label: String, value: String, key: String }],
  priority: { type: String, required: false },
  img: { type: String, required: false },
});

export const TaskModel = mongoose.model("tasks", TaskSchema);

// module.exports = TaskModel
