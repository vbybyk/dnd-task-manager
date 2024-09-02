import { AnyAction } from "redux";
import { IProject } from "../../Interfaces/tasks";

export interface IProjectState {
  projects: IProject[];
  isFetching: boolean;
  project: IProject;
}

const initialState: IProjectState = {
  projects: [],
  project: {} as IProject,
  isFetching: false,
};

export const project = (state = initialState, action: AnyAction): IProjectState => {
  switch (action.type) {
    case "PROJECTS_REQUEST":
    case "PROJECT_REQUEST":
      return { ...state, isFetching: true };
    case "PROJECTS_SUCCESS":
      return { ...state, isFetching: false, projects: action.payload };
    case "PROJECT_SUCCESS":
      return { ...state, isFetching: false, project: action.payload };
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) => (project.id === action.payload.id ? action.payload : project)),
      };
    case "DELETE_PROJECT":
      return { ...state, projects: state.projects.filter((project) => project.id !== action.payload) };
    case "PROJECTS_REQUEST_ERROR":
    case "PROJECT_REQUEST_ERROR":
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
