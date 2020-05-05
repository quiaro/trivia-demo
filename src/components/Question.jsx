import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

const Question = (props) => {
  const classes = useStyles();
  return <div className={classes.container}>Question</div>;
};

export default Question;
