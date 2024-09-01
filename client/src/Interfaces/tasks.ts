import { IPriority } from "../Components/Common/PriorityIcon/PriorityIcon";

export interface IProject {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface IContainer {
  _id?: string;
  id: number;
  projectId: number;
  name: string;
  sortId?: number;
}
export interface ITask {
  _id: string;
  id: number;
  projectId: number;
  containerId: number;
  sortId?: number;
  name: string;
  description?: string;
  images?: string[];
  labels?: ILabel[] | null;
  priority: IPriority;
  assigneeId?: number;
}

export interface ILabel {
  id: number;
  projectId: number;
  label: string;
  value: string;
  color: string;
  border: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
  job_title?: string;
  company?: string;
  location?: string;
  about?: string;
}
