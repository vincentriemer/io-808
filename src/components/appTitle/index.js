import React from "react";
import * as stylex from "@stylexjs/stylex";

import { themeStyles } from "theme/styles";
import { tokens } from "theme/variables.stylex";

const lineHeight = 1.5;
const titleRight = 60;
const lineTop = 55;

const styles = stylex.create({
  wrapper: {
    position: "relative"
  },
  titleLine: {
    position: "absolute",
    width: 898,
    height: `${lineHeight}%`,
    left: "50%",
    transform: "translateX(-50%)",
    top: `${lineTop}%`,
    backgroundColor: tokens.stencilOrange
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
    alignItems: "baseline",
    position: "absolute",
    bottom: `calc(${lineTop}% - 17.5px)`,
    right: titleRight
  },
  titleBig: {
    fontFamily: tokens.brandingFontFamily,
    marginRight: 40,
    color: tokens.stencilOrange,
    fontSize: 50,
    textShadow: `0.3rem 0 ${tokens.darkGrey},0.3rem 0rem ${tokens.darkGrey},-0.3rem -0 ${tokens.darkGrey},-0.3rem 0 ${tokens.darkGrey}`
  },
  titleSmall: {
    fontFamily: tokens.brandingFontFamily,
    color: tokens.stencilOrange,
    fontSize: 40,
    letterSpacing: -1.5
  },
  subtitle: {
    fontFamily: tokens.brandingFontFamily,
    position: "absolute",
    top: `${lineTop + lineHeight * 3}%`,
    right: titleRight,
    fontSize: 28,
    letterSpacing: -1
  },
  rotatedE: {
    display: "inline-block",
    transformOrigin: "50% 60%",
    transform: "rotate(-40deg)"
  }
});

const TitleText = React.memo(props => {
  const { text } = props;
  // Split the text by the e character and re-add them but with rotation applied
  const eSplit = text.split("e");
  const result = eSplit.reduce((acc, cur, idx) => {
    if (acc === null) {
      return [cur];
    }
    const rotatedE = (
      <span key={idx} {...stylex.props(styles.rotatedE)}>
        e
      </span>
    );
    return [...acc, rotatedE, cur];
  }, null);
  return result;
});

const AppTitle = props => {
  const { xstyle } = props;

  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.titleLine)} />
      <div {...stylex.props(styles.titleWrapper)}>
        <div {...stylex.props(themeStyles.labelGreyLarge, styles.titleBig)}>
          <TitleText text="Rhythm Composer" />
        </div>
        <div {...stylex.props(themeStyles.labelGreyLarge, styles.titleSmall)}>
          <TitleText text="iO-808" />
        </div>
      </div>
      <div {...stylex.props(themeStyles.labelGreyLarge, styles.subtitle)}>
        <TitleText text="Browser Controlled" />
      </div>
    </div>
  );
};

export default AppTitle;
