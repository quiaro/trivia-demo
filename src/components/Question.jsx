import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";

import { useTriviaContext } from "../context/trivia-context";
import ButtonSecondary from "./ButtonsSecondary";

const useStyles = makeStyles((theme) => ({
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
    alignItems: "center",
  },
  main: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  card: {
    width: "70%",
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  cardActions: {
    padding: theme.spacing(2, 3),
    justifyContent: "space-between",
  },
  dot: {
    width: "1rem",
    height: "1rem",
  },
  footer: {
    flex: 1,
  },
  stepper: {
    padding: theme.spacing(2),
  },
}));

const Question = ({ question, total, index }) => {
  const { dispatch } = useTriviaContext();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Typography variant="h2">{question.category}</Typography>
      </header>
      <main className={classes.main}>
        <Card className={classes.card} variant="outlined">
          <CardContent
            data-cy="question"
            classes={{ root: classes.cardContent }}
          >
            <Typography variant="body1" paragraph>
              {question.text}
            </Typography>
          </CardContent>
          <CardActions classes={{ root: classes.cardActions }}>
            <ButtonSecondary
              color="#8e24aa"
              size="large"
              onClick={() =>
                dispatch({ type: "answer_question", payload: true })
              }
            >
              True
            </ButtonSecondary>
            <ButtonSecondary
              color="#303f9f"
              size="large"
              onClick={() =>
                dispatch({ type: "answer_question", payload: false })
              }
            >
              False
            </ButtonSecondary>
          </CardActions>
        </Card>
      </main>
      <footer className={classes.footer}>
        <MobileStepper
          classes={{ root: classes.stepper, dot: classes.dot }}
          variant="dots"
          steps={total}
          position="static"
          activeStep={index}
        />
        <Typography
          variant="body1"
          component="span"
          display="block"
          align="center"
        >
          <span data-cy="step-index">{index + 1}</span> of{" "}
          <span data-cy="step-total">{total}</span>
        </Typography>
      </footer>
    </div>
  );
};

export default Question;
