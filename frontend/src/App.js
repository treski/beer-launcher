import React from "react";
import Home from "./views/Home";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/index";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
