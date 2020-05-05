import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { defaultTheme } from "../styles/theme";
import { generateColor } from "../utils/color";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
  },
  header: {
    position: "sticky",
    top: 0,
    textAlign: "center",
    padding: theme.spacing(3, 0),
    backgroundColor: theme.app.backgroundColor,
    zIndex: 10,
  },
  categories: {
    padding: theme.spacing(0, 2, 4),
    overflow: "hidden",
  },
  category: {
    float: "left",
    margin: theme.spacing(1.5),
  },
}));

// TODO: Remove categories
const categories = [
  {
    id: 1,
    name: "Sports: NBA",
  },
  {
    id: 2,
    name: "Entertainment: Video Games",
  },
  {
    id: 3,
    name: "Entertainment: TV Shows",
  },
  {
    id: 4,
    name: "Music: 90s",
  },
  {
    id: 1,
    name: "Sports: NBA",
  },
  {
    id: 2,
    name: "Entertainment: Video Games",
  },
  {
    id: 3,
    name: "Entertainment: TV Shows",
  },
  {
    id: 4,
    name: "Music: 90s",
  },
  {
    id: 1,
    name: "Sports: NBA",
  },
  {
    id: 2,
    name: "Entertainment: Video Games",
  },
  {
    id: 3,
    name: "Entertainment: TV Shows",
  },
  {
    id: 4,
    name: "Music: 90s",
  },
  {
    id: 1,
    name: "Sports: NBA",
  },
  {
    id: 2,
    name: "Entertainment: Video Games",
  },
  {
    id: 3,
    name: "Entertainment: TV Shows",
  },
  {
    id: 4,
    name: "Music: 90s",
  },
  {
    id: 1,
    name: "Sports: NBA",
  },
  {
    id: 2,
    name: "Entertainment: Video Games",
  },
  {
    id: 3,
    name: "Entertainment: TV Shows",
  },
  {
    id: 4,
    name: "Music: 90s",
  },
  {
    id: 1,
    name: "Sports: NBA",
  },
  {
    id: 2,
    name: "Entertainment: Video Games",
  },
  {
    id: 3,
    name: "Entertainment: TV Shows",
  },
  {
    id: 4,
    name: "Music: 90s",
  },
  {
    id: 1,
    name: "Sports: NBA",
  },
  {
    id: 2,
    name: "Entertainment: Video Games",
  },
  {
    id: 3,
    name: "Entertainment: TV Shows",
  },
  {
    id: 4,
    name: "Music: 90s",
  },
  {
    id: 1,
    name: "Sports: NBA",
  },
  {
    id: 2,
    name: "Entertainment: Video Games",
  },
  {
    id: 3,
    name: "Entertainment: TV Shows",
  },
  {
    id: 4,
    name: "Music: 90s",
  },
];

const Categories = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Typography variant="h2">Please select a category</Typography>
      </header>
      <ol className={classes.categories}>
        {categories.map((category, index) => {
          const color = generateColor(index);
          const theme = createMuiTheme({
            ...defaultTheme,
            palette: {
              primary: {
                main: color,
              },
            },
          });
          return (
            <li className={classes.category}>
              <ThemeProvider theme={theme}>
                <Button
                  key={category.id}
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={console.log("select category")}
                >
                  {category.name}
                </Button>
              </ThemeProvider>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Categories;
