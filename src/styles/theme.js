import { createMuiTheme } from "@material-ui/core/styles";

export const defaultTheme = {
  app: {
    backgroundColor: "#f7f7f7",
  },
  palette: {
    primary: {
      main: "#636fb2",
    },
    secondary: {
      main: "#ffccd7",
    },
    text: {
      primary: "#353E48",
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontStyle: "normal",
    h1: {
      fontSize: "3.6rem",
    },
    h2: {
      fontSize: "2.8rem",
    },
    body1: {
      fontSize: "1.6rem",
    },
    body2: {
      fontSize: "1.4rem",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: "1.4rem",
      },
    },
  },
};

const theme = createMuiTheme({ ...defaultTheme });

export default theme;
