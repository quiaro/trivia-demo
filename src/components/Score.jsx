import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

const Score = (props) => {
  const classes = useStyles();
  return <div className={classes.container}>Score</div>;
};

export default Score;
