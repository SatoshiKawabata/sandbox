import * as React from "react";
import Actions from "../../action/Actions";
import { IState, ITodo } from "../../store/State";

export default (props: { todo: ITodo; actions: Actions }) => (
  <div>
    <input
      type="checkbox"
      checked={props.todo.done}
      id={props.todo.uid}
      onChange={e => {
        props.actions.updateTodo({
          uid: props.todo.uid,
          label: props.todo.label,
          done: e.target.checked
        });
      }}
    />
    <label htmlFor={props.todo.uid}>{props.todo.label}</label>
  </div>
);
