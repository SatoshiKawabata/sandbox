import React from "react";
import ReactDOM from "react-dom";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import SubPage from "./pages/SubPage";
const { Suspense } = React;

ReactDOM.render(
  <>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/page1" component={Page1} />
          <Route path="/page2" component={Page2} />
          <Route path="/subPage" component={SubPage} />
        </Switch>
      </Suspense>
    </Router>
  </>,
  document.querySelector("#app")
);
