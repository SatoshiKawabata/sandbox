import React from "react";
import { Provider, defaultTheme, Button } from "@adobe/react-spectrum";

function App() {
  return (
    <Provider theme={defaultTheme} height="100vh">
      <Button variant="cta" onPress={() => alert("Hey there!")}>
        Hello React Spectrum!
      </Button>
    </Provider>
  );
}

export default App;
