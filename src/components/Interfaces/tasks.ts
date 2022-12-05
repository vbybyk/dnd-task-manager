export interface ITaskState {
  tasksArr?: ITask[];
  setTasksArr: (tasks: any) => void;
  favoriteTasks?: ITask[];
  setFavoriteTasks: (tasks: any) => void;
  getFavorite: () => void;
  getFavoriteById: (id: number) => void;
  updateFavorite: (values: any) => void;
  deleteFavorite: (id: number) => void;
}
export interface ITask {
  task: string;
  id: number;
  checked: boolean;
  filter: string;
  favorite: boolean;
}
