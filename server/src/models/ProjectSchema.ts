import mongoose from 'mongoose';
import { Schema, Model, Types } from 'mongoose';
import { Task } from './TaskSchema';

interface Project {
  id: number;
  name: string;
  description: string;
  containers: {
    todo: Types.DocumentArray<Task>,
    progress: Types.DocumentArray<Task>,
    done: Types.DocumentArray<Task>
  }
}

const ProjectSchema = new mongoose.Schema<Project>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  containers: {
    todo: [{type: Object, required: false}],
    progress: [{type: Object, required: false}],
    done: [{type: Object, required: false}]
  }
})

export const ProjectModel = mongoose.model("projects", ProjectSchema)

// module.exports = ProjectModel;