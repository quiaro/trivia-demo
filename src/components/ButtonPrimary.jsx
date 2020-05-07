import React from "react";
import { Button } from "@material-ui/core";

function ButtonPrimary({ children, ...buttonProps }) {
  return (
    <Button type="button" variant="contained" color="primary" {...buttonProps}>
      {children}
    </Button>
  );
}

export default ButtonPrimary;
