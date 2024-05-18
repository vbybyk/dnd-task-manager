import { Reducer } from "redux";
import { AnyAction } from "redux";

const initialState = {
  message: "",
  type: "",
};

export const alert: Reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "SUCCESS":
      return { message: action.message, type: "success" };
    case "ERROR":
      return { message: action.message, type: "error" };
    case "CLEAR":
      return { message: "", type: "" };
    default:
      return state;
  }
};
