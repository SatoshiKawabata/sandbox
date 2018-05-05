import * as React from "react";
import { connect } from "react-redux";
import { createStore, Dispatch } from "redux";
import Actions from "../../action/Actions";
import { IState } from "../../store/State";
import SubComponent from "../atoms/SubComponent";

interface IProps {
  state: IState;
  actions: Actions;
}

class App extends React.Component<IProps> {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
        <SubComponent state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({ state });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: new Actions(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
