import * as React from "react";
import * as ReactDOM from "react-dom";

const App = () => {
  console.log("window", window);

  const [second, setSecond] = React.useState<number>(0);

  setInterval(() => {
    setSecond(second + 1);
  }, 1000);

  return (
    <div>
      <h1>Hello!!!</h1>
      {second}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
