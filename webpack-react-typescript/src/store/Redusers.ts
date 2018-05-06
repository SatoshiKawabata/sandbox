import { Action } from "redux";
import ActionType from "../action/ActionType";
import { initialState, IState } from "./State";

export default (state: IState = initialState, action): IState => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      state.todos.push({
        label: action.label,
        uid: Date.now().toString(),
        done: false
      });
    case ActionType.INPUT_NEW:
      state.inputLabel = action.label;
    case ActionType.UPDATE_TODO:
      state.todos.some(todo => {
        if (todo.uid === action.uid) {
          todo.label = action.label;
          todo.done = action.done;
          return true;
        }
      });
  }
  const stringfiedState = JSON.stringify(state);
  localStorage.setItem("state", stringfiedState);
  return JSON.parse(stringfiedState);
};
