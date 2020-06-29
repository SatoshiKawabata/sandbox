import { Action, Dispatch } from "redux";
import { ITodo } from "../store/State";
import ActionType from "./ActionType";

export default class Actions {
  constructor(private dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  addTodo(label: string) {
    this.dispatch({
      type: ActionType.ADD_TODO,
      label
    });
  }

  inputNew(label: string) {
    this.dispatch({
      type: ActionType.INPUT_NEW,
      label
    });
  }

  updateTodo(todo: ITodo) {
    this.dispatch({
      type: ActionType.UPDATE_TODO,
      label: todo.label,
      done: todo.done,
      uid: todo.uid
    });
  }
}
