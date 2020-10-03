import React from "react";
import ReactDOM from "react-dom";

const Main = () => {
  return <div>Hello Content Scripts.</div>;
};

const app = document.createElement("div");
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
