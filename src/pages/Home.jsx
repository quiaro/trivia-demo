import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";
import Typography from "@material-ui/core/Typography";

import { NEW_TRIVIA_ID } from "./Trivia";
import { useTriviaContext } from "../context/trivia-context";
import ButtonPrimary from "../components/ButtonPrimary";

const useStyles = makeStyles(() => ({
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  footer: {
    flex: 1,
  },
}));

const Home = () => {
  const { dispatch } = useTriviaContext();
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Typography variant="h1" align="center">
          Welcome to the Trivia Challenge
        </Typography>
      </header>
      <main className={classes.main}>
        <div>
          <Typography variant="h2" paragraph>
            You will be presented with 10 True or False questions.
          </Typography>
          <Typography variant="h2" component="span" display="block">
            Can you score 100%?
          </Typography>
        </div>
      </main>
      <footer className={classes.footer}>
        <ButtonPrimary onClick={() => navigate(`/trivia/${NEW_TRIVIA_ID}`)}>
          Begin
        </ButtonPrimary>
      </footer>
    </div>
  );
};

export default Home;
