import React from "react";
import ReactDOM from "react-dom";
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Home = loadable(() => import('./pages/Home'));
const Page1 = loadable(() => import('./pages/Page1'));
const Page2 = loadable(() => import('./pages/Page2'));

const { Suspense } = React;

ReactDOM.render(
  [
    <h1>hello meerkat🐈</h1>,
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page1">Page1</Link>
          </li>
          <li>
            <Link to="/page2">Page2</Link>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/page1" component={Page1}/>
          <Route path="/page2" component={Page2}/>
        </Switch>
      </Suspense>
    </Router>
  ],
  document.querySelector("#app")
);
