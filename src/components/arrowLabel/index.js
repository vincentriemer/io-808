import React from "react";
import * as stylex from "@stylexjs/stylex";

import { themeStyles } from "theme/styles";
import { tokens } from "theme/variables.stylex";

const styles = stylex.create({
  wrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  left: {
    flexDirection: "row-reverse"
  },
  right: {
    flexDirection: "row"
  },

  arrowPoint: {
    width: 0,
    height: 0,
    borderTopStyle: "solid",
    borderTopColor: tokens.transparent,
    borderBottomStyle: "solid",
    borderBottomColor: tokens.transparent
  },

  arrowShaft: {
    position: "relative",
    transform: "scaleX(1.1)"
  },

  labelWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1
  },
  compactLabelWrapper: {
    width: 95.5,
    height: 18,
    backgroundColor: tokens.grey
  },
  compactText: {
    color: tokens.darkGrey
  },
  compactShaft: {
    width: 4.5,
    height: 6,
    backgroundColor: tokens.grey
  },
  compactPointSides: {
    borderTopWidth: 6.75,
    borderBottomWidth: 6.75
  },
  compactPointRight: {
    borderLeftWidth: 9,
    borderLeftStyle: "solid",
    borderLeftColor: tokens.grey
  },
  standardLabelWrapper: {
    width: 121.25,
    height: 25,
    backgroundColor: tokens.darkGrey
  },
  standardText: {
    color: tokens.grey
  },
  standardShaft: {
    width: 6.25,
    height: 25 / 3,
    backgroundColor: tokens.darkGrey
  },
  standardPointSides: {
    borderTopWidth: 9.375,
    borderBottomWidth: 9.375
  },
  standardPointLeft: {
    borderRightWidth: 12.5,
    borderRightStyle: "solid",
    borderRightColor: tokens.darkGrey
  },
  standardPointRight: {
    borderLeftWidth: 12.5,
    borderLeftStyle: "solid",
    borderLeftColor: tokens.darkGrey
  }
});

const variantStyles = {
  compact: {
    labelWrapper: styles.compactLabelWrapper,
    text: styles.compactText,
    shaft: styles.compactShaft,
    pointSides: styles.compactPointSides
  },
  standard: {
    labelWrapper: styles.standardLabelWrapper,
    text: styles.standardText,
    shaft: styles.standardShaft,
    pointSides: styles.standardPointSides
  }
};

const ArrowLabel = props => {
  const { label, xstyle, variant, direction } = props;
  const variantStyle = variantStyles[variant];
  const pointsLeft = direction === "left";

  return (
    <div
      {...stylex.props(
        styles.wrapper,
        xstyle,
        pointsLeft ? styles.left : styles.right
      )}
    >
      <div {...stylex.props(styles.labelWrapper, variantStyle.labelWrapper)}>
        <div {...stylex.props(themeStyles.labelGreyNormal, variantStyle.text)}>
          {label}
        </div>
      </div>
      <div {...stylex.props(styles.arrowShaft, variantStyle.shaft)} />
      <div
        {...stylex.props(
          styles.arrowPoint,
          variantStyle.pointSides,
          pointsLeft
            ? styles.standardPointLeft
            : variant === "compact"
            ? styles.compactPointRight
            : styles.standardPointRight
        )}
      />
    </div>
  );
};

export default ArrowLabel;
