import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
  footer: {
    flex: 1,
  },
}));

const Question = ({ question }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Typography variant="h2">{question.category}</Typography>
      </header>
      <main className={classes.main}>
        <Card className={classes.card} variant="outlined">
          <CardContent classes={{ root: classes.cardContent }}>
            <Typography variant="body1" paragraph>
              {question.text}
            </Typography>
          </CardContent>
          <CardActions classes={{ root: classes.cardActions }}>
            <ButtonSecondary color="#8e24aa" size="large">
              True
            </ButtonSecondary>
            <ButtonSecondary color="#303f9f" size="large">
              False
            </ButtonSecondary>
          </CardActions>
        </Card>
      </main>
      <footer className={classes.footer}>This is the footer</footer>
    </div>
  );
};

export default Question;
