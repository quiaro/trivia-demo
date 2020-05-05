import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import deepOrange from "@material-ui/core/colors/deepOrange";
import brown from "@material-ui/core/colors/brown";
import blueGrey from "@material-ui/core/colors/blueGrey";

const hues = [
  red,
  indigo,
  pink,
  green,
  cyan,
  brown,
  blueGrey,
  deepOrange,
  lightGreen,
  purple,
  lightBlue,
  teal,
  deepPurple,
  blue,
];

const shades = [500, 600, 700, 800, 900];

export function generateColor(index) {
  // Limited to hues.length * shades.length.
  // Colors will be reused after that
  const hueIndex = index % hues.length;
  const shadeIndex = Math.floor(index / hues.length) % shades.length;
  return hues[hueIndex][shades[shadeIndex]];
}
