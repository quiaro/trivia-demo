import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Router } from "@reach/router";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import NoSsr from "@material-ui/core/NoSsr";

import Home from "./pages/Home";
import Trivia from "./pages/Trivia";
import NotFound from "./pages/NotFound";
import Question from "./components/Question";
import Score from "./components/Score";

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
          <Router>
            <Home path="/" />
            <Trivia path="trivia/:triviaId/">
              <Question path="question/:questionId" />
              <Score path="score" />
            </Trivia>
            <NotFound default />
          </Router>
        </Container>
      </ThemeProvider>
    </NoSsr>
  );
}

export default App;
