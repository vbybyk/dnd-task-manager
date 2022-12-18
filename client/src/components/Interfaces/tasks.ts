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
export interface ITask {
  id: number;
  name: string;
  description?: string;
  img?: string;
  label?: { label: string; value: string; key: string }[] | null;
  priority: string;
}
