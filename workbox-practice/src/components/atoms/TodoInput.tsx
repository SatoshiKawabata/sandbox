import * as React from "react";
import Actions from "../../action/Actions";

export default (props: { inputLabel: string; actions: Actions }) => (
  <div>
    <input
      type="text"
      value={props.inputLabel}
      onChange={e => {
        props.actions.inputNew((e.target as HTMLInputElement).value);
      }}
    />
    <button
      type="button"
      disabled={!props.inputLabel}
      onClick={() => {
        props.actions.addTodo(props.inputLabel);
        props.actions.inputNew("");
      }}
    >
      Add Todo
    </button>
  </div>
);
