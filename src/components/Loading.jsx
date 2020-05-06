import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@keyframes stretchDelay": {
    "0%": {
      transform: "scaleY(0.4)",
    },
    "40%": {
      transform: "scaleY(0.4)",
    },
    "100%": {
      transform: "scaleY(0.4)",
    },
    "20%": {
      transform: "scaleY(1.0)",
    },
  },
  container: {
    display: "flex",
    width: "100%",
    height: (props) => props.height || "100%",
    fontSize: 10,
    justifyContent: "center",
    alignItems: "center",

    "& .spinner": {
      margin: "0 auto",
      width: 50,
      height: 60,
      fontSize: 10,
    },

    "& .spinner > div": {
      backgroundColor: theme.palette.primary.light,
      height: "100%",
      width: 6,
      display: "inline-block",
      animation: "$stretchDelay 1.2s infinite ease-in-out",
      margin: "0 1px",
    },

    "& .spinner .rect2": {
      animationDelay: "-1.1s",
    },

    "& .spinner .rect3": {
      animationDelay: "-1.0s",
    },

    "& .spinner .rect4": {
      animationDelay: "-0.9s",
    },

    "& .spinner .rect5": {
      animationDelay: "-0.8s",
    },
  },
}));

const Loading = ({ height }) => {
  const classes = useStyles({ height });
  return (
    <div className={classes.container}>
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  );
};

export default Loading;
