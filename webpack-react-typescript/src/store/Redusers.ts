import { Action } from "redux";
import ActionType from "../action/ActionType";
import { initialState, IState } from "./State";

export default (state: IState = initialState, action): IState => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return {
        count: state.count + 1,
        hoge: action.hoge
      };
    default:
      return state;
  }
};
