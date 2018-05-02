import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Redusers } from './redusers';
import SubComponent from './SubComponent';

class App extends React.Component {
  render() {
    return (
        <div>
          <h1>Hello React!</h1>
          <SubComponent />
        </div>
    );
  }
}

const store = createStore(Redusers);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
document.querySelector('#app'));