import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CorrectIcon from "@material-ui/icons/CheckCircle";
import IncorrectIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  answer: {
    fontStyle: "normal",
    color: theme.palette.grey[600],

    "& > *": {
      fontStyle: "normal",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2.5, 0),
  },
  content: {
    flex: 1,
    textAlign: "left",
    paddingLeft: theme.spacing(3),
  },
  correct: {
    color: theme.palette.success.main,
    fontSize: "2.8rem",
  },
  incorrect: {
    color: theme.palette.error.main,
    fontSize: "2.8rem",
  },
  text: {
    margin: theme.spacing(0.2, 0),
    lineHeight: 1.32,
  },
}));

const QuestionResult = ({ question }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {question.score === 0 ? (
        <IncorrectIcon className={classes.incorrect} fontSize="large" />
      ) : (
        <CorrectIcon className={classes.correct} fontSize="large" />
      )}
      <div className={classes.content}>
        <Typography variant="caption">
          <b>{question.category}</b>
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          {question.text}
        </Typography>
        <Typography variant="body2" component="span" className={classes.answer}>
          Correct Answer: <em>{question.correctAnswer.toString()}</em>
        </Typography>
      </div>
    </div>
  );
};

export default QuestionResult;
