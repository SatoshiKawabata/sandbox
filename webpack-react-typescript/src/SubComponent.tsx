
import * as React from 'react';
import { connect } from 'react-redux';
import { increment } from "./Actions";
import { IState } from './redusers';

class SubComponent extends React.Component<IState & IDispatcher> {

  handleClick() {
    this.props.handleClick();
  }

  render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <button onClick={this.handleClick.bind(this)}>Add +1</button>
      </div>
    );
  }
}

const mapStateToProps = (state: IState): IState => {
  return state
}

interface IDispatcher {
  handleClick: () => void;
}

const mapDispatchToProps = (dispatch):IDispatcher => {
  return {
    handleClick: () => { dispatch(increment()) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubComponent);
