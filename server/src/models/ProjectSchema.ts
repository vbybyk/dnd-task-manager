import mongoose from "mongoose";

interface Project {
  id?: number;
  name: string;
  description: string;
  imageUrl?: string;
}

const ProjectSchema = new mongoose.Schema<Project>({
  id: { type: Number, required: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
});

export const ProjectModel = mongoose.model("projects", ProjectSchema);

// module.exports = ProjectModel;
