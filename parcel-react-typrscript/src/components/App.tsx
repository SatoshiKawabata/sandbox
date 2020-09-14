import React from "react";
import { Provider, defaultTheme, Button, Text } from "@adobe/react-spectrum";

function App() {
  return (
    <Provider theme={defaultTheme} height="100vh">
      <Button variant="cta" onPress={() => alert("Hey there!")}>
        Hello React Spectrum!
      </Button>
      <Text>{location.search}</Text>
    </Provider>
  );
}

export default App;
