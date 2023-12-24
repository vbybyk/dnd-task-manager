import mongoose from "mongoose";
import { Schema, Model, Types } from "mongoose";

interface Label {
  label: string;
  value: string;
  key: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  label?: Types.DocumentArray<Label>;
  priority: string;
  img?: string;
}

export const TaskSchema = new Schema<Task, Model<Task>>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  label: [{ label: String, value: String, key: String }],
  priority: { type: String, required: false },
  img: { type: String, required: false },
});

export const TaskModel = mongoose.model("tasks", TaskSchema);

// module.exports = TaskModel
