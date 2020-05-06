import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "@reach/router";
import { useTriviaContext } from "../context/trivia-context";
import Typography from "@material-ui/core/Typography";

import Question from "../components/Question";
import Score from "../components/Score";
import Loading from "../components/Loading";

export const NEW_TRIVIA_ID = "new";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Trivia = ({ triviaId }) => {
  const { state, dispatch } = useTriviaContext();
  const classes = useStyles();

  useEffect(() => {
    if (triviaId === NEW_TRIVIA_ID) {
      // Creating a new game ...
      if (!state.triviaId) {
        // The new game doesn't yet exist in the state
        dispatch({ type: "create_trivia" });
      }
    } else {
      if (!state.triviaId) {
        // Load the game specified in the URL
        dispatch({ type: "load_trivia", payload: triviaId });
      }
    }
  }, [triviaId, state.triviaId, dispatch]);

  if (state.error) {
    return (
      <div className={classes.container}>
        <Typography variant="body1" color="error" paragraph align="center">
          {state.error.message}
        </Typography>
      </div>
    );
  }
  if (state.isLoading) {
    return (
      <div className={classes.container}>
        <Loading />
      </div>
    );
  }

  if (triviaId === NEW_TRIVIA_ID && state.triviaId) {
    return (
      <Redirect
        from={`/trivia/${NEW_TRIVIA_ID}`}
        to={`/trivia/${state.triviaId}`}
        noThrow
      />
    );
  }

  // Unlikely to happen, but just in case ...
  if (!state.triviaId) return null;

  if (state.questions.length === state.answers.length) {
    // All questions have been answered
    return <Score questions={state.questions} answers={state.answers} />;
  }

  return <Question questions={state.questions} current={state.current} />;
};

export default Trivia;
