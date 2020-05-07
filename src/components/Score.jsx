import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import QuestionResult from "./QuestionResult";
import ButtonPrimary from "./ButtonPrimary";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    maxHeight: "70%",
  },
  card: {
    width: "80%",
    height: "100%",
    overflow: "auto",
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  footer: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    marginTop: theme.spacing(1),
  },
}));

const Score = ({ questions, answers }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const results = questions.map((question, index) => {
    if (question.correctAnswer === answers[index]) {
      return { ...question, score: 1 };
    }
    return { ...question, score: 0 };
  });
  const score = results.reduce((acc, res) => acc + res.score, 0);

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Typography variant="h2" display="block" align="center">
          You scored
        </Typography>
        <Typography
          className={classes.score}
          variant="h2"
          display="block"
          align="center"
        >
          {score} / {questions.length}
        </Typography>
      </header>
      <main className={classes.main}>
        <Card className={classes.card} variant="outlined">
          <CardContent classes={{ root: classes.cardContent }}>
            {results.map((result) => (
              <QuestionResult key={result.id} question={result} />
            ))}
          </CardContent>
        </Card>
      </main>
      <footer className={classes.footer}>
        <ButtonPrimary onClick={() => navigate(`/`)}>Play Again</ButtonPrimary>
      </footer>
    </div>
  );
};

export default Score;
