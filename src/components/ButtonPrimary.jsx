import React from "react";
import { Button } from "@material-ui/core";

function ButtonPrimary({ children, ...buttonProps }) {
  return (
    <Button variant="contained" color="secondary" {...buttonProps}>
      {children}
    </Button>
  );
}

export default ButtonPrimary;
