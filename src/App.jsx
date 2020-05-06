import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Router } from "@reach/router";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import NoSsr from "@material-ui/core/NoSsr";

import { TriviaContextProvider } from "./context/trivia-context";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Trivia from "./pages/Trivia";

import "typeface-roboto";
import "./styles/base.css";
import appTheme, { defaultTheme } from "./styles/theme";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: defaultTheme.app.backgroundColor,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <NoSsr>
      <ThemeProvider theme={appTheme}>
        <Container className={classes.container} maxWidth="sm">
          <TriviaContextProvider>
            <Router>
              <Home path="/" />
              <Trivia path="trivia/:triviaId/" />
              <NotFound default />
            </Router>
          </TriviaContextProvider>
        </Container>
      </ThemeProvider>
    </NoSsr>
  );
}

export default App;
