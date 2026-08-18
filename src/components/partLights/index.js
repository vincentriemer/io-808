import React from "react";
import * as stylex from "@stylexjs/stylex";

import Light from "components/light";

import { themeStyles } from "theme/styles";

import { FIRST_PART, SECOND_PART } from "store-constants";

const styles = stylex.create({
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7
  },
  partWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  label: {
    marginTop: 4,
    width: 60
  }
});

const PartLights = props => {
  const { currentPart, xstyle } = props;
  const firstActive = currentPart === FIRST_PART;
  const secondActive = currentPart === SECOND_PART;
  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.partWrapper)}>
        <Light active={firstActive} />
        <div {...stylex.props(themeStyles.labelGreyNormal, styles.label)}>
          1st PART
        </div>
      </div>
      <div {...stylex.props(styles.partWrapper)}>
        <Light active={secondActive} />
        <div {...stylex.props(themeStyles.labelGreyNormal, styles.label)}>
          2nd PART
        </div>
      </div>
    </div>
  );
};

export default PartLights;
