import * as React from "react";
import { connect } from "react-redux";
import { createStore, Dispatch } from "redux";
import Actions from "../../action/Actions";
import { IState } from "../../store/State";
import Todo from "../atoms/Todo";
import TodoInput from "../atoms/TodoInput";

interface IProps {
  state: IState;
  actions: Actions;
}

class App extends React.Component<IProps> {
  render() {
    console.log(this.props.state);
    return (
      <div>
        <h1>Hello React!</h1>
        <TodoInput
          inputLabel={this.props.state.inputLabel}
          actions={this.props.actions}
        />
        {this.props.state.todos.map(todo => (
          <Todo todo={todo} key={todo.uid} actions={this.props.actions} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({ state });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: new Actions(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
