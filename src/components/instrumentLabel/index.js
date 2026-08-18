import React from "react";
import * as stylex from "@stylexjs/stylex";

import { themeStyles } from "theme/styles";
import { tokens } from "theme/variables.stylex";

const styles = stylex.create({
  wrapper: {
    width: "100%",
    height: 36,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: tokens.drumLabel,
    borderRadius: 4
  },

  innerWrapper: {
    alignItems: "baseline",
    cursor: "default",
    display: "flex",
    flexDirection: "row",
    wordSpacing: "-0.1em"
  },
  label: {
    fontFamily: tokens.panelFontFamily,
    whiteSpace: "pre",
    color: tokens.darkGrey,
    letterSpacing: -0.5
  },
  small: {
    fontSize: 11
  },
  large: {
    fontSize: 19,
    fontWeight: 400
  }
});

const InstrumentLabel = props => {
  const { label } = props;
  const formattedLabel = label.map((section, index) => {
    let labelSize, value;
    if (section[0] === "*") {
      labelSize = styles.large;
      value = section.slice(1);
    } else {
      labelSize = styles.small;
      value = section;
    }

    return (
      <div
        key={index}
        {...stylex.props(themeStyles.unselectableText, styles.label, labelSize)}
      >
        {value}
      </div>
    );
  });

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.innerWrapper)}>{formattedLabel}</div>
    </div>
  );
};

export default InstrumentLabel;
