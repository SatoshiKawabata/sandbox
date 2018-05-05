import * as React from "react";
import Actions from "../../action/Actions";
import { IState } from "../../store/State";

interface IProps {
  state: IState;
  actions: Actions;
}

export default class SubComponent extends React.Component<IProps> {
  handleClick() {
    this.props.actions.increment("a");
  }

  render() {
    return (
      <div>
        <div>{this.props.state.count}</div>
        {this.props.state.hoge}
        <button onClick={this.handleClick.bind(this)}>Add +1</button>
      </div>
    );
  }
}
