import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: (props) =>
    props.color
      ? {
          color: "#ffffff",
          backgroundColor: props.color,
          fontSize: "1.4rem",
          opacity: 0.82,
          transition: theme.transitions.create("opacity"),

          "&:hover": {
            backgroundColor: props.color,
            opacity: 1,
          },
        }
      : {},
}));

function ButtonSecondary({ children, color, ...buttonProps }) {
  const classes = useStyles({ color });

  return (
    <Button
      className={classes.button}
      type="button"
      variant="outlined"
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

export default ButtonSecondary;
