import React from "react";
import { RouteComponentProps } from "react-router";
import FooterTabs from "../components/FooterTabs";
import loadable from "@loadable/component";
const Test = loadable(() => import("./../components/Test"));

const Page1 = (props: RouteComponentProps) => {
  return (
    <div>
      Page1
      <Test />
      <FooterTabs {...props} />
    </div>
  );
};

export default Page1;
