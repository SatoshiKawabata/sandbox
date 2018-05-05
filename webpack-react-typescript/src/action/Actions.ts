import { Action, Dispatch } from "redux";
import ActionType from "./ActionType";

export default class Actions {
  private dispatch: Dispatch;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  increment(hoge: string) {
    this.dispatch({
      type: ActionType.INCREMENT,
      hoge
    });
  }
}
