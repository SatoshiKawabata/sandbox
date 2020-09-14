import { h, render } from "preact";
import styled from "@emotion/styled";

const SomeComp = styled.h1`
  color: hotpink;
`;

const App = () => {
  return <SomeComp>Hello Preact Emotion!</SomeComp>
};

render(<App />, document.getElementById("app") as Element);
