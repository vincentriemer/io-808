import * as stylex from "@stylexjs/stylex";

import { tokens } from "./variables.stylex";

export const themeStyles = stylex.create({
  unselectableText: {
    userSelect: "none"
  },
  defaultCursor: {
    cursor: "default"
  },
  autoCursor: {
    cursor: "auto"
  },
  labelBase: {
    fontFamily: tokens.panelFontFamily,
    fontWeight: tokens.fontWeight,
    textAlign: tokens.textAlign,
    letterSpacing: tokens.letterSpacing,
    userSelect: "none",
    cursor: "inherit"
  },
  labelGreyNormal: {
    fontFamily: tokens.panelFontFamily,
    fontWeight: tokens.fontWeight,
    textAlign: tokens.textAlign,
    letterSpacing: tokens.letterSpacing,
    userSelect: "none",
    cursor: "inherit",
    fontSize: tokens.normalSize,
    color: tokens.grey
  },
  labelGreyLarge: {
    fontFamily: tokens.panelFontFamily,
    fontWeight: tokens.fontWeight,
    textAlign: tokens.textAlign,
    letterSpacing: tokens.letterSpacing,
    userSelect: "none",
    cursor: "inherit",
    fontSize: tokens.largeSize,
    color: tokens.grey
  },
  labelGreyXLarge: {
    fontFamily: tokens.panelFontFamily,
    fontWeight: tokens.fontWeight,
    textAlign: tokens.textAlign,
    userSelect: "none",
    cursor: "inherit",
    fontSize: tokens.xLargeSize,
    color: tokens.grey,
    letterSpacing: "-1px",
    padding: 2
  },
  labelGreySmall: {
    fontFamily: tokens.panelFontFamily,
    fontWeight: tokens.fontWeight,
    textAlign: tokens.textAlign,
    letterSpacing: tokens.letterSpacing,
    userSelect: "none",
    cursor: "inherit",
    fontSize: tokens.smallSize,
    color: tokens.grey
  },
  labelGreyXSmall: {
    fontFamily: tokens.panelFontFamily,
    fontWeight: tokens.fontWeight,
    textAlign: tokens.textAlign,
    letterSpacing: tokens.letterSpacing,
    userSelect: "none",
    cursor: "inherit",
    fontSize: tokens.xSmallSize,
    color: tokens.grey
  },
  labelDarkGrey: {
    fontFamily: tokens.panelFontFamily,
    textAlign: tokens.textAlign,
    letterSpacing: tokens.letterSpacing,
    userSelect: "none",
    cursor: "inherit",
    fontSize: tokens.normalSize,
    color: tokens.darkGrey,
    fontWeight: "normal"
  },
  labelText: {
    userSelect: "none",
    cursor: "inherit"
  },
  ring: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    borderRadius: "50%"
  },
  focusOutline: {
    outlineWidth: 3,
    MozOutlineRadius: 5,
    outlineStyle: stylex.firstThatWorks("auto", "solid"),
    outlineColor: stylex.firstThatWorks(
      "-webkit-focus-ring-color",
      "Highlight"
    )
  }
});
