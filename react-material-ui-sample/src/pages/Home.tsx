import React from "react";
import { RouteComponentProps } from "react-router-dom";
import FooterTabs from "../components/FooterTabs";
import loadable from "@loadable/component";
const Test = loadable(() => import("./../components/Test"));

const Home = (props: RouteComponentProps) => {
  return (
    <div>
      Home
      <Test />
      <FooterTabs {...props} />
    </div>
  );
};

export default Home;
