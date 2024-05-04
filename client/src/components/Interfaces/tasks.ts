export interface IProject {
  id: number;
  name: string;
  description: string;
  containers: {
    todo: ITask[];
    progress: ITask[];
    done: ITask[];
  };
}

export interface IContainer {
  _id?: string;
  id: number;
  projectId: number;
  name: string;
  sortId?: number;
}
export interface ITask {
  id: number;
  projectId: number;
  containerId: number;
  sortId?: number;
  name: string;
  description?: string;
  img?: string;
  label?: { label: string; value: string; key: string }[] | null;
  priority: string;
}
