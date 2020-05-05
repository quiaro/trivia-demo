import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

const Trivia = (props) => {
  const classes = useStyles();
  return <div className={classes.container}>Trivia</div>;
};

export default Trivia;
