import React from "react";

import { fontFamily, darkGrey, drumLabel } from "theme/variables";
import { unselectableText } from "theme/mixins";

const baseLabelStyle = {
  fontFamily,
  whiteSpace: "pre",
  color: darkGrey,
  letterSpacing: -0.4,
  ...unselectableText
};

const styles = {
  wrapper: {
    width: "100%",
    height: 36,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: drumLabel,
    borderRadius: 4
  },

  innerWrapper: {
    alignItems: "baseline",
    cursor: "default",
    display: "flex",
    flexDirection: "row"
  },

  smallLabel: {
    ...baseLabelStyle,
    fontSize: 11
  },

  largeLabel: {
    ...baseLabelStyle,
    fontSize: 19
  }
};

const InstrumentLabel = props => {
  const { label } = props;
  const formattedLabel = label.map((section, index) => {
    let style, value;
    if (section[0] === "*") {
      style = "largeLabel";
      value = section.slice(1);
    } else {
      style = "smallLabel";
      value = section;
    }

    return (
      <div key={index} style={styles[style]}>
        {value}
      </div>
    );
  });

  return (
    <div style={styles.wrapper}>
      <div style={styles.innerWrapper}>{formattedLabel}</div>
    </div>
  );
};

export default InstrumentLabel;
